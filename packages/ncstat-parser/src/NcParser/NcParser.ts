import { clone, eq, filter, last } from "lodash/fp";

import { NcLexer, NcToken } from "@/NcLexer";
import { NcProgram } from "@/NcProgram";

import { NcBlock } from "../NcBlock";
import {
  NcMachineState,
  NcMachineStateType,
  NcService
} from "../NcService";
import { CannedCycle, getLimits, Tool, Toolpath } from "../Toolpath";
import {
  ActiveModals,
  AxesLimits,
  MachinePositions,
  Modals,
  NcParserConfig
  // NcProgram
} from "../types";
// import { ValueToken } from "../types/tokens";
import { getModals, updatePosition } from "./lib";
import { NcEventEmitter } from "./NcEventEmitter";

const isIdle = eq(NcMachineState.IDLE);
const isToolpathing = eq(NcMachineState.TOOLPATHING);
const isInCannedCycle = eq(NcMachineState.IN_CANNED_CYCLE);

export class NcParser extends NcEventEmitter {
  /**
   * Settings
   */
  debug = false;

  /**
     Proram Vars
    */
  programNumber = NaN;
  programTitle = "";
  // program: Linear<NcBlock> = new Linear<NcBlock>();
  toolpaths: Toolpath[] = [];

  /**
   * Parser Vars
   */
  blocks: NcBlock[] = [];

  /**
   * Internals
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private machine: any; // @TODO get this to work with `typeof NcService`;
  private state = NcMachineState.IDLE;
  private lexer: NcLexer;
  private tokens: NcToken[] = [];

  constructor(config: Partial<NcParserConfig> = { debug: false }) {
    super();

    this.debug = Boolean(config?.debug);

    this.lexer = new NcLexer(config?.lexerConfig ?? {});

    // Bubble?
    // this.lexer.on("token", token => this.$emitToken(token));

    this.machine = NcService;

    this.machine.subscribe((state: { value: NcMachineStateType }) => {
      this.$emitStateChange({
        prev: this.state,
        curr: state.value
      });

      this.state = state.value;
    });
  }

  // toString(): string {
  //   return `%\n${this.program.join("\n")}%`;
  // }

  // get lines(): string[] {
  //   return map(Object.toString, this.blocks);
  // }

  getLexer(): NcLexer {
    return this.lexer;
  }

  // getTokens(): Array<Token> {
  //   return this.lexer.tokens(this.input);
  // }

  getLimits(): Partial<AxesLimits> {
    return {
      X: getLimits("X")(this.toolpaths),
      Y: getLimits("Y")(this.toolpaths),
      Z: getLimits("Z")(this.toolpaths)
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

  parse(source: string): NcProgram {
    const program = new NcProgram();

    this.tokens = this.lexer.tokens(source);

    program.loadTokens(this.tokens);

    let modals: ActiveModals = {
      [Modals.MOTION_CODES]: Modals.RAPID,
      [Modals.PLANE_SELECTION]: "G17",
      [Modals.POSITIONING_MODE]: Modals.ABSOLUTE
    };

    let position: MachinePositions = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };

    let currToolpath = new Toolpath();

    /**
     * Start the state machine service
     */
    this.machine.start();

    /**
     * Run the program
     */
    program.withBlocks((block: NcBlock) => {
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
        this.machine.send("START_CANNED_CYCLE");

        const cannedCycle = CannedCycle.fromBlock(block);

        currToolpath.addCannedCycle(cannedCycle);
      }

      if (isInCannedCycle(this.state)) {
        if (block.G.includes(80)) {
          this.machine.send("END_CANNED_CYCLE");
        }

        if (block.hasMovement) {
          const point = clone(position.curr);
          const lastCC = last(currToolpath.cannedCycles) as CannedCycle;

          lastCC.addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      if (block.toString().startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.machine.send("END_TOOLPATH");
          this.toolpaths.push(currToolpath);
        }

        if (isIdle(this.state)) {
          currToolpath = new Toolpath();

          const tool = Tool.create({
            number: block.N,
            desc: block.comment
          });

          currToolpath.setTool(tool);

          this.machine.send("START_TOOLPATH");
        }
      }

      if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
        if ([8, 50].includes(block.M)) {
          currToolpath.hasCoolant = true;
        }

        /**
         * Override N line tool description with Txx Mxx ()
         * Move the N line desc to currToolpath.desc
         */
        if (block.hasToolChange) {
          if (currToolpath.tool) {
            currToolpath.tool.number = block.T;
          }

          if (block.comment) {
            currToolpath.description = currToolpath?.tool?.desc;
          }
        }

        currToolpath.addBlock(block);
      }
    });

    this.machine.send("END_TOOLPATH");
    this.machine.stop();

    program.toolpaths.push(currToolpath);

    return program;
  }
}
