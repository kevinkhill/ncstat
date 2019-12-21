import { createMachine, interpret } from "@xstate/fsm";
import {
  clone,
  each,
  eq,
  filter,
  get,
  has,
  last,
  map,
  reject,
  split,
  min,
  uniq
} from "lodash/fp";

import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { HMC_AXES } from "./constants";
import { filterEmptyLines } from "./lib";
import { Modals } from "./NcCodes";
import { NcFile } from "./NcFile";
import { Events, NcService, States } from "./NcService";
import { Toolpath } from "./Toolpath";
import { HmcAxis, Position, ToolInfo } from "./types";

export class Program {
  static create(lines: string[]): Program {
    return new Program(lines);
  }

  static fromFile(file: NcFile): Program {
    return new Program(file.getLines());
  }

  static analyzeNcFile(file: NcFile): Program {
    const program = Program.fromFile(file);

    return program.analyze();
  }

  activeModals: {
    [K: string]: boolean;
  } = {};
  number = 0;
  title?: string;
  toolpaths: Toolpath[] = [];

  private blocks: Block[] = [];
  private nc: any;
  private position: {
    curr: Position;
    prev: Position;
  };

  constructor(private readonly rawInput: string[]) {
    this.position = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };

    this.nc = NcService;
  }

  toString(): string {
    return this.rawInput.join("\n");
  }

  isActiveModal(input: string): boolean {
    return has(input, this.activeModals);
  }

  getLines(): string[] {
    return this.rawInput;
  }

  getNumber(): number {
    return this.number;
  }

  getTitle(): string | undefined {
    return this.title;
  }

  getToolPaths(): Toolpath[] {
    return this.toolpaths;
  }

  getToolpathCount(): number {
    return this.toolpaths.length;
  }

  getPosition(): Position {
    return this.position.curr;
  }

  getPrevPosition(): Position {
    return this.position.prev;
  }

  getToolPathsWithTools(): Toolpath[] {
    return filter(path => path.hasTool, this.toolpaths);
  }

  getDeepestZ(): number | undefined {
    const z: number[] = [];
    const zRegex = /Z(-[0-9.]+)\s/g;

    each(line => {
      const m = zRegex.exec(line);

      if (m) {
        z.push(parseFloat(m[1]));
      }
    }, this.getLines()));

    return min(uniq(z));
  }

  getToolList(): ToolInfo[] {
    return map(
      (path: Toolpath) => path.tool.toTuple(),
      this.getToolPathsWithTools()
    );
  }

  analyze(): this {
    const stateIs = eq(this.nc.state);

    let toolpath = new Toolpath();

    const lines = filterEmptyLines(this.rawInput);

    this.blocks = map(Block.parse, lines);

    // const { initialState } = NcStateMachine;

    // console.log(initialState);

    for (const block of this.blocks) {
      this.setModals(block);

      if (block.hasAddress("O")) {
        this.number = block.values.O;
        this.title = block.comment;
      }

      if (block.hasMovement()) {
        this.updatePosition(block);
      }

      if (block.isStartOfCannedCycle && stateIs("toolpathing")) {
        this.nc.send(Events.START_CANNED_CYCLE);

        const cannedCycle = CannedCycle.fromBlock(block);

        toolpath.addCannedCycle(cannedCycle);
      }

      if (stateIs(States.IN_CANNED_CYCLE)) {
        if (block.G(80)) {
          this.nc.send(Events.END_CANNED_CYCLE);
        }

        if (block.hasMovement()) {
          const point = clone(this.position.curr);
          const lastCC = last(toolpath.cannedCycles) as CannedCycle;

          lastCC.addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      if (block.rawInput.startsWith("N")) {
        if (stateIs("toolpathing")) {
          this.nc.send(Events.END_TOOLPATH);
          this.toolpaths.push(toolpath);
        }

        if (stateIs("idle")) {
          toolpath = Toolpath.fromBlock(block);

          this.nc.send(Events.START_TOOLPATH);
        }
      }

      // If we're toolpathing or in a canned cycle, save it to the toolpath
      if (stateIs("toolpathing") || stateIs("in-canned-cycle")) {
        toolpath.pushBlock(block);
      }
    }

    this.nc.send(Events.END_TOOLPATH);

    this.toolpaths.push(toolpath);

    return this;
  }

  private updatePosition(block: Block): void {
    const blockPosition = block.getPosition();

    this.position.prev = clone(this.position.curr);

    each(axis => {
      if (has(axis, blockPosition)) {
        const blockAxisPosition = get(axis, blockPosition);

        this.updateAxis(axis as HmcAxis, blockAxisPosition);
      }
    }, HMC_AXES);
  }

  private updateAxis(axis: HmcAxis, value: number): void {
    if (this.activeModals[Modals.INCREMENTAL]) {
      this.position.curr[axis] += value;
    }

    if (this.activeModals[Modals.ABSOLUTE]) {
      this.position.curr[axis] = value;
    }
  }

  private setModals(block: Block): void {
    if (block.G(0)) {
      this.activeModals[Modals.RAPID] = true;
      this.activeModals[Modals.FEED] = false;
    } else if (block.G(1)) {
      this.activeModals[Modals.FEED] = true;
      this.activeModals[Modals.RAPID] = false;
    }

    if (block.G(90)) {
      this.activeModals[Modals.ABSOLUTE] = true;
      this.activeModals[Modals.INCREMENTAL] = false;
    } else if (block.G(91)) {
      this.activeModals[Modals.INCREMENTAL] = true;
      this.activeModals[Modals.ABSOLUTE] = false;
    }
  }
}
