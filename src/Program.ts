import {
  assign,
  clone,
  each,
  eq,
  filter,
  get,
  has,
  last,
  map,
  min,
  split,
  uniq
} from "lodash/fp";

import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { HMC_AXES } from "./lib/constants";
import { Modals, PositioningMode } from "./NcCodes";
import { NcFile } from "./NcFile";
import { Events, NcService, States } from "./NcService";
import { Toolpath } from "./Toolpath";
import {
  MachinePositions,
  Position,
  ProgramAnalysis,
  ToolInfo
} from "./types";

function getDeepestZ(lines: string[]): number | undefined {
  const z: number[] = [];
  const zRegex = /Z(-[0-9.]+)\s/g;

  each(line => {
    const m = zRegex.exec(line);

    if (m) {
      z.push(parseFloat(m[1]));
    }
  }, lines);

  return min(uniq(z));
}

export function updatePosition(
  position: MachinePositions,
  positionType: PositioningMode,
  block: Block
): void {
  const blockPosition = block.getPosition();

  const newPosition = clone(position);

  newPosition.prev = position.curr;

  each(axis => {
    if (has(axis, blockPosition)) {
      const blockAxisPosition = get(axis, blockPosition);

      if (positionType === Modals.INCREMENTAL) {
        newPosition.curr[axis] += blockAxisPosition;
      }

      if (positionType === Modals.ABSOLUTE) {
        newPosition.curr[axis] = blockAxisPosition;
      }
    }
  }, HMC_AXES);
}

export function getModals(
  block: Block
): {
  GROUP_01: string;
  GROUP_02: string;
  GROUP_03: string;
} {
  const modals = {
    [Modals.MOTION_CODES]: Modals.RAPID,
    [Modals.PLANE_SELECTION]: "G17",
    [Modals.POSITIONING_MODE]: Modals.ABSOLUTE
  };

  if (block.has(Modals.RAPID)) {
    modals[Modals.MOTION_CODES] = Modals.RAPID;
  }

  if (block.has(Modals.FEED)) {
    modals[Modals.MOTION_CODES] = Modals.FEED;
  }

  // if (block.has(Modals.ABSOLUTE)) {
  //   modals[Modals.PLANE_SELECTION] = "G17";
  // }

  if (block.has(Modals.ABSOLUTE)) {
    modals[Modals.POSITIONING_MODE] = Modals.ABSOLUTE;
  }

  if (block.has(Modals.INCREMENTAL)) {
    modals[Modals.POSITIONING_MODE] = Modals.INCREMENTAL;
  }

  return modals;
}

export class Program {
  static create(code: string): Program {
    return new Program(code);
  }

  static fromLines(lines: string[]): Program {
    return Program.create(lines.join());
  }

  static fromFile(file: NcFile): Program {
    return Program.fromLines(file.getLines());
  }

  static parse(code: string): ProgramAnalysis {
    const program = new Program(code);

    return program.analyze();
  }

  number = 0;
  title?: string;
  toolpaths: Toolpath[] = [];

  private nc: any;
  private blocks: Block[] = [];

  constructor(private readonly rawInput: string) {
    this.nc = NcService;

    this.nc.subscribe((state: { value: States }) => {
      console.log(state);
    });
  }

  toString(): string {
    return this.rawInput;
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

  getToolPathsWithTools(): Toolpath[] {
    return filter(path => path.hasTool, this.toolpaths);
  }

  getToolList(): ToolInfo[] {
    return map(
      (path: Toolpath) => path.tool.toTuple(),
      this.getToolPathsWithTools()
    );
  }

  analyze(): ProgramAnalysis {
    let toolpath = new Toolpath();

    let modals = {
      [Modals.MOTION_CODES]: Modals.RAPID,
      [Modals.PLANE_SELECTION]: "G17",
      [Modals.POSITIONING_MODE]: Modals.ABSOLUTE as PositioningMode
    };

    let position = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 } as Position,
      prev: { X: 0, Y: 0, Z: 0, B: 0 } as Position
    };

    this.nc.start();

    const stateIs = eq(this.nc.state);

    /**
     * @TODO  Allow empty blocks as special case
     */
    const lines = filter((l: string) => l.length > 0, this.getLines());

    this.blocks = map(Block.parse, lines);

    for (const block of this.blocks) {
      modals = Object.assign(modals, getModals(block));
      console.log(modals);
      if (block.hasAddress("O")) {
        this.number = block.values.O;
        this.title = block.comment;
      }

      if (block.hasMovement()) {
        const newPosition = updatePosition(
          position,
          modals[Modals.POSITIONING_MODE],
          block
        );

        position = Object.assign(position, newPosition);
      }

      if (block.isStartOfCannedCycle && stateIs(States.TOOLPATHING)) {
        this.nc.send(Events.START_CANNED_CYCLE);

        const cannedCycle = CannedCycle.fromBlock(block);

        toolpath.addCannedCycle(cannedCycle);
      }

      if (stateIs(States.IN_CANNED_CYCLE)) {
        if (block.G(80)) {
          this.nc.send(Events.END_CANNED_CYCLE);
        }

        if (block.hasMovement()) {
          const point = clone(position.curr);
          const lastCC = last(toolpath.cannedCycles) as CannedCycle;

          lastCC.addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      if (block.rawInput.startsWith("N")) {
        if (stateIs(States.TOOLPATHING)) {
          this.nc.send(Events.END_TOOLPATH);
          this.toolpaths.push(toolpath);
        }

        if (stateIs(States.IDLE)) {
          toolpath = Toolpath.fromBlock(block);

          this.nc.send(Events.START_TOOLPATH);
        }
      }

      // If we're toolpathing or in a canned cycle, save it to the toolpath
      if (
        stateIs(States.TOOLPATHING) ||
        stateIs(States.IN_CANNED_CYCLE)
      ) {
        toolpath.pushBlock(block);
      }
    }

    this.nc.send(Events.END_TOOLPATH);

    this.toolpaths.push(toolpath);

    return {
      // blocks: this.blocks,
      toolpaths: this.toolpaths,
      extents: {
        X: { min: -Infinity, max: Infinity },
        Y: { min: -Infinity, max: Infinity },
        Z: { min: -Infinity, max: Infinity },
        B: { min: -Infinity, max: Infinity }
      }
    };
  }
}
