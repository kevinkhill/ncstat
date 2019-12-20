import { createMachine } from "@xstate/fsm";
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
  split
} from "lodash/fp";

import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { HMC_AXES } from "./constants";
import { filterEmptyLines } from "./lib";
import { Modals } from "./NcCodes";
import { NcFile } from "./NcFile";
import { NcService, NcStateMachine } from "./NcService";
import { Toolpath } from "./Toolpath";
import { HmcAxis, Position, ToolInfo } from "./types";

export class NcAnalyzer {
  static analyzeNcFile(file: NcFile) {
    const program = new Program(file.getLines());

    return program.analyze();
  }

  activeModals: {
    [K: string]: boolean;
  } = {};
  number = 0;
  title?: string;
  toolpaths: Toolpath[] = [];

  private blocks: Block[] = [];
  // private state: typeof Machine;
  private exec: any;
  private position: {
    curr: Position;
    prev: Position;
  };

  constructor(private readonly rawInput: string) {
    this.position = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };

    this.exec = NcService;
  }

  toString(): string {
    return this.rawInput;
  }

  isActiveModal(input: string): boolean {
    return has(input, this.activeModals);
  }

  getLines(): string[] {
    return split("\n", this.rawInput);
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

  getToolList(): ToolInfo[] {
    return map(
      (path: Toolpath) => path.tool.toTuple(),
      this.getToolPathsWithTools()
    );
  }

  analyze(): this {
    let toolpath = new Toolpath();

    const lines = filterEmptyLines(this.rawInput);

    this.blocks = map(Block.parse, lines);

    const { initialState } = NcStateMachine;

    console.log(initialState);

    for (const block of this.blocks) {
      this.setModals(block);

      if (block.hasAddress("O")) {
        this.number = block.values.O;
        this.title = block.comment;
      }

      if (block.hasMovement()) {
        this.updatePosition(block);
      }

      if (block.isStartOfCannedCycle && this.exec.is("toolpathing")) {
        this.exec.startCannedCycle();

        const cannedCycle = CannedCycle.fromBlock(block);

        toolpath.addCannedCycle(cannedCycle);
      }

      if (this.exec.is("in-canned-cycle")) {
        if (block.G(80)) {
          this.exec.endCannedCycle();
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
        if (this.exec.is("toolpathing")) {
          this.exec.endToolpath();
          this.toolpaths.push(toolpath);
        }

        if (this.exec.is("idle")) {
          toolpath = Toolpath.fromBlock(block);

          this.exec.startToolpath();
        }
      }

      // If we're toolpathing or in a canned cycle, save it to the toolpath
      if (
        this.exec.is("toolpathing") ||
        this.exec.is("in-canned-cycle")
      ) {
        toolpath.pushBlock(block);
      }
    }

    this.exec.endToolpath();

    this.toolpaths.push(toolpath);

    return this;
  }

  private updatePosition(block: Block): void {
    const blockPosition = block.getPosition();

    // console.log(blockPosition);

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
