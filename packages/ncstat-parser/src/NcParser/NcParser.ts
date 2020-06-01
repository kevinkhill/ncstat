import { clone, eq, filter, last } from "lodash/fp";

import { NcLexer, NcToken } from "@/NcLexer";
import { CannedCycle, NcProgram, Tool, Toolpath } from "@/NcProgram";
import {
  NcMachineState,
  NcMachineStateType,
  NcService
} from "@/NcService";
import {
  ActiveModals,
  MachinePositions,
  Modals,
  NcParserConfig
} from "@/types";

import { getModals, updatePosition } from "./lib";
import { NcBlock } from "./NcBlock";
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
  private lexer: NcLexer;
  private tokens: NcToken[] = [];
  private machine: any; // @TODO get this to work with `typeof NcService`;
  private state = NcMachineState.IDLE;
  private currToolpath!: Toolpath;

  constructor(config: Partial<NcParserConfig> = { debug: false }) {
    super();

    this.debug = Boolean(config?.debug);

    this.lexer = new NcLexer(config?.lexerConfig ?? {});

    // @TODO Bubble this event?
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

  get toolpathCount(): number {
    return this.toolpaths.length;
  }

  getLexer(): NcLexer {
    return this.lexer;
  }

  getToolpathsWithTools(): Toolpath[] {
    return filter("hasTool", this.toolpaths);
  }

  // getToolList(): Array<> {
  //   return map(
  //     (path: Toolpath) => path.tool,
  //     this.getToolPathsWithTools()
  //   );
  // }

  initParser;

  /**
   * Parse a stream of NcTokens into NcBlocks
   */
  parse(source: string): NcProgram {
    this.tokens = this.lexer.tokens(source);
    this.currToolpath = new Toolpath();

    const program = new NcProgram();

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

    /**
     * Start the state machine service
     */
    this.machine.start();

    /**
     * Run the program
     */
    program.withBlocks((block: NcBlock) => {
      modals = { ...modals, ...getModals(block) };

      program.number = block.O;
      program.name = block.comment;

      if (block.hasMovement) {
        const newPosition = updatePosition(
          position,
          modals[Modals.POSITIONING_MODE],
          block
        );

        position = { ...position, ...newPosition };
      }

      if (block.isStartOfCannedCycle && isToolpathing(this.state)) {
        this.machine.send("START_CANNED_CYCLE");

        const cannedCycle = CannedCycle.fromBlock(block);

        this.currToolpath.addCannedCycle(cannedCycle);
      }

      if (isInCannedCycle(this.state)) {
        if (block.G.includes(80)) {
          this.machine.send("END_CANNED_CYCLE");
        }

        if (block.hasMovement) {
          const point = clone(position.curr);
          const lastCC = last(
            this.currToolpath.cannedCycles
          ) as CannedCycle;

          lastCC.addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      if (block.toString().startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.machine.send("END_TOOLPATH");
          this.toolpaths.push(this.currToolpath);
        }

        if (isIdle(this.state)) {
          this.currToolpath = new Toolpath();

          const tool = Tool.create({
            number: block.N,
            desc: block.comment
          });

          this.currToolpath.setTool(tool);

          this.machine.send("START_TOOLPATH");
        }
      }

      if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
        if ([8, 50].includes(block.M)) {
          this.currToolpath.hasCoolant = true;
        }

        /**
         * Override N line tool description with Txx Mxx ()
         * Move the N line desc to this.currToolpath.desc
         */
        if (block.hasToolChange) {
          if (this.currToolpath.tool) {
            this.currToolpath.tool.number = block.T;
          }

          if (block.comment) {
            this.currToolpath.description = this.currToolpath?.tool?.desc;
          }
        }

        this.currToolpath.addBlock(block);
      }
    });

    this.machine.send("END_TOOLPATH");
    this.machine.stop();

    program.toolpaths.push(this.currToolpath);

    return program;
  }
}
