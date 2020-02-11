import { Linear } from "doublie";
import { EventEmitter } from "eventemitter3";
import fs from "fs";
import { clone, eq, filter, last } from "lodash/fp";
import path from "path";

import { getBlockGenerator, NcBlock, NcBlocks } from "../NcBlock";
import { getTokenGenerator, NcTokens } from "../NcLexer";
import { Events, NcService, States } from "../NcService";
import { CannedCycle, getLimits, Tool, Toolpath } from "../Toolpath";
import {
  ActiveModals,
  AxesLimits,
  MachinePositions,
  NcProgram
} from "../types";
import { Modals, PositioningMode } from "./codes";
import { getModals, updatePosition } from "./lib";

const isIdle = eq(States.IDLE);
const isToolpathing = eq(States.TOOLPATHING);
const isInCannedCycle = eq(States.IN_CANNED_CYCLE);

export class NcParser extends EventEmitter {
  programNumber = NaN;
  programTitle = "";
  tokens: NcTokens = [];
  blocks: NcBlocks = [];
  program: NcProgram = new Linear<NcBlock>();
  toolpaths: Toolpath[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private nc: any;
  private state: States = States.IDLE;

  constructor() {
    super();

    this.nc = NcService;

    this.nc.subscribe((state: { value: States }) => {
      this.emit("stateChange", {
        prev: this.state,
        curr: state
      });

      this.state = state.value;
    });
  }

  toString(): string {
    return `%\n${this.program.join("\n")}%`;
  }

  // get lines(): string[] {
  //   return map(Object.toString, this.blocks);
  // }

  getLimits(): Partial<AxesLimits> {
    return {
      X: getLimits("X", this.toolpaths),
      Y: getLimits("Y", this.toolpaths),
      Z: getLimits("Z", this.toolpaths)
    };
  }

  get toolpathCount(): number {
    return this.toolpaths.length;
  }

  getToolPathsWithTools(): Toolpath[] {
    return filter("hasTool", this.toolpaths);
  }

  // getToolList(): Array<> {
  //   return map(
  //     (path: Toolpath) => path.tool,
  //     this.getToolPathsWithTools()
  //   );
  // }

  async parseFile(abspath: string): Promise<NcProgram> {
    if (!path.isAbsolute(abspath)) {
      this.emit("error", `"${abspath}" is not an absolute path`);
    }

    try {
      const buffer = await fs.promises.readFile(abspath);

      return this.parse(buffer.toString());
    } catch (err) {
      this.emit("error", `Could not open "${abspath}"`);
    }
  }

  parse(source: string): NcProgram {
    this.tokens = getTokenGenerator(source);
    this.blocks = getBlockGenerator(this.tokens);

    //@TODO move this to the end?
    this.program.append(...this.blocks);

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
     * Run the program
     */
    this.program.forEach((block: NcBlock) => {
      modals = Object.assign(modals, getModals(block));

      this.programNumber = block.O;
      this.programTitle = block.comment;

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
        if (block.G.includes(80)) {
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
      if (block.toString().startsWith("N")) {
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
        if ([8, 50].includes(block.M)) {
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
    });

    this.nc.send(Events.END_TOOLPATH);
    this.nc.stop();

    this.toolpaths.push(toolpath);

    return this.program;
  }
}
