import {
  clone,
  eq,
  filter,
  flow,
  last,
  map,
  reject,
  split
} from "lodash/fp";

import { NcBlock } from "../NcBlock";
import { Modals, PositioningMode } from "../NcParser/codes";
import { CannedCycle, getLimits, Tool, Toolpath } from "../Toolpath";
import { ActiveModals, AxesLimits, MachinePositions } from "../types";
import { getModals } from "./getModals";
import {
  Events,
  isIdle,
  isInCannedCycle,
  isToolpathing,
  NcService,
  States
} from "./NcService";
import { updatePosition } from "./updatePosition";

export class Program {
  static create(code: string): Program {
    return new Program(code);
  }

  number = 0;
  title?: string;
  state: States = States.IDLE;
  toolpaths: Toolpath[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private nc: any;
  private blocks: NcBlock[] = [];

  constructor(private readonly rawInput: string) {
    this.nc = NcService;

    this.nc.subscribe((state: { value: States }) => {
      this.state = state.value;
    });
  }

  toString(): string {
    return this.rawInput;
  }

  getLines(): string[] {
    return split("\n", this.rawInput);
  }

  getLimits(): Partial<AxesLimits> {
    return {
      X: getLimits("X", this.toolpaths),
      Y: getLimits("Y", this.toolpaths),
      Z: getLimits("Z", this.toolpaths)
    };
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

  // getToolList(): Array<> {
  //   return map(
  //     (path: Toolpath) => path.tool,
  //     this.getToolPathsWithTools()
  //   );
  // }

  analyze(): Program {
    let toolpath = new Toolpath();

    let modals: ActiveModals = {
      [Modals.MOTION_CODES]: Modals.RAPID,
      [Modals.PLANE_SELECTION]: "G17",
      [Modals.POSITIONING_MODE]: Modals.ABSOLUTE as PositioningMode
    };

    let position: MachinePositions = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };

    this.nc.start();

    /**
     * @TODO  Allow empty blocks as special case
     */
    const mapLinesToBlocks = flow([
      reject(eq("")),
      reject(eq("%")),
      map(NcBlock.parse)
    ]);

    this.blocks = mapLinesToBlocks(this.getLines());

    for (const block of this.blocks) {
      modals = Object.assign(modals, getModals(block));

      this.number = block.O;
      this.title = block.comment;

      if (block.hasMovement) {
        const newPosition = updatePosition(
          position,
          modals[Modals.POSITIONING_MODE],
          block
        );

        position = Object.assign(position, newPosition);
      }

      if (block.isStartOfCannedCycle && isToolpathing(this.state)) {
        this.nc.send(Events.START_CANNED_CYCLE);

        const cannedCycle = CannedCycle.fromBlock(block);

        toolpath.addCannedCycle(cannedCycle);
      }

      if (isInCannedCycle(this.state)) {
        if (block.G(80)) {
          this.nc.send(Events.END_CANNED_CYCLE);
        }

        if (block.hasMovement) {
          const point = clone(position.curr);
          const lastCC = last(toolpath.cannedCycles) as CannedCycle;

          lastCC.addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      if (block.rawInput.startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.nc.send(Events.END_TOOLPATH);
          this.toolpaths.push(toolpath);
        }

        if (isIdle(this.state)) {
          toolpath = new Toolpath();

          const tool = Tool.create({
            number: block.N,
            desc: block.comment
          });

          toolpath.setTool(tool);

          this.nc.send(Events.START_TOOLPATH);
        }
      }

      if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
        if (block.M === 8 || block.M === 50) {
          toolpath.hasCoolant = true;
        }

        /**
         * Override N line tool description with Txx Mxx ()
         * Move the N line desc to toolpath.desc
         */
        if (block.hasToolChange) {
          if (toolpath.tool) {
            toolpath.tool.number = block.T;
          }

          if (block.comment) {
            toolpath.description = toolpath?.tool?.desc;
          }
        }

        toolpath.pushBlock(block);
      }
    }

    this.nc.send(Events.END_TOOLPATH);

    this.toolpaths.push(toolpath);

    return this;
  }
}
