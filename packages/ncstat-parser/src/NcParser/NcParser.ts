import Debug from "debug";
import { clone, eq, filter, get, has, last } from "lodash/fp";

import { NcLexer, NcToken } from "@/NcLexer";
import { CannedCycle, NcProgram, Tool, Toolpath } from "@/NcProgram";
import {
  NcMachineState,
  NcMachineStateType,
  NcService
} from "@/NcService";
import { define, gCode, mCode } from "@/NcSpec";
import { Addresses } from "@/NcSpec/addresses";
import {
  ActiveModals,
  CodeDefinition,
  Modals,
  NcParserConfig,
  Planes,
  Position
} from "@/types";

import { getModals, updatePosition } from "./lib";
import { HMC_AXES } from "./lib/updatePosition";
import { blockGenerator, NcBlock } from "./NcBlock";
import { NcEventEmitter } from "./NcEventEmitter";

const isIdle = eq(NcMachineState.IDLE);
const isToolpathing = eq(NcMachineState.TOOLPATHING);
const isInCannedCycle = eq(NcMachineState.IN_CANNED_CYCLE);

export class NcParser extends NcEventEmitter {
  static readonly namespace = "ncstat:parser";
  static readonly defaults = {
    debug: false,
    lexerConfig: NcLexer.defaults
  };

  config: NcParserConfig = NcParser.defaults;

  private lexer: NcLexer;
  private program: NcProgram;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private machine: any; // @TODO get this to work with `typeof NcService`;
  private state: NcMachineStateType = NcMachineState.IDLE;
  private currToolpath!: Toolpath;
  private readonly debug = Debug(NcParser.namespace);

  private currBlock: NcBlock | null = null;
  private prevBlock: NcBlock | null = null;

  private currPosition: Position | null = { X: 0, Y: 0, Z: 0, B: 0 };
  private prevPosition: Position | null = null;

  private modals: ActiveModals = {
    [Modals.MOTION_CODES]: Modals.RAPID,
    [Modals.PLANE_SELECTION]: Planes.XY,
    [Modals.POSITIONING_MODE]: Modals.ABSOLUTE
  };

  constructor(config?: Partial<NcParserConfig>) {
    super();
    this.config = { ...this.config, ...config };

    if (this.config.debug) {
      Debug.enable(NcParser.namespace);
    }

    this.lexer = new NcLexer(this.config.lexerConfig);
    this.program = new NcProgram();
    this.currToolpath = new Toolpath();

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

  getLexer(): NcLexer {
    return this.lexer;
  }

  async parse(source: string): Promise<NcProgram> {
    this.machine.start();

    for (const block of this.yieldBlocks(source)) {
      this.currBlock = block;

      this.debug(
        `[PARSE] %d tokens <${this.currBlock}>`,
        this.currBlock.length
      );

      this.modals = getModals(this.modals, block);

      // Example: O2134 ( NAME )
      if (block.$has("O")) {
        this.debug("[FOUND] Program Number: %d", block.O);
        this.program.number = block.O;

        if (block.hasComment) {
          this.setProgramName(block.comment);
        }
      }

      // Example: ( NAME )
      if (this.program.name === null && block.hasComment) {
        this.setProgramName(block.comment);
      }

      if (block.hasMovement) {
        this.updatePosition();

        this.debug("[ MOVE] Block contains axis positions");
        this.debug("[ FROM] %o", this.prevPosition);
        this.debug("[   TO] %o", this.currPosition);
      }

      if (block.isStartOfCannedCycle && isToolpathing(this.state)) {
        this.startCannedCycle(block);
      }

      if (isInCannedCycle(this.state)) {
        if (block.G.includes(80)) {
          this.machine.send("END_CANNED_CYCLE");
        }

        if (block.hasMovement) {
          const point = clone(this.currPosition);
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
          this.program.toolpaths.push(this.currToolpath);
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

      this.program.appendBlock(block);

      this.prevBlock = this.currBlock;
      // this.$emitBlock(block);
    } // end of for

    this.machine.send("END_TOOLPATH");
    this.machine.stop();

    this.prevBlock = null;
    this.currBlock = null;

    this.program.toolpaths.push(this.currToolpath);

    return this.program;
  }

  *yieldBlocks(input: string): Generator<NcBlock> {
    yield* blockGenerator(this.lexer.tokenize(input));
  }

  private setProgramName(name: string): void {
    this.debug("Program name found: %s", name);
    this.program.name = name;
  }

  private startCannedCycle(block: NcBlock): void {
    this.machine.send("START_CANNED_CYCLE");

    const cannedCycle = CannedCycle.fromBlock(block);

    this.currToolpath.addCannedCycle(cannedCycle);
  }

  // eslint-disable-next-line class-methods-use-this
  private defineToken(token: NcToken): CodeDefinition {
    switch (token.prefix) {
      case "M":
        return mCode(token.value as number);
      case "G":
        return gCode(token.value as number);
      case "R":
        return define(Addresses.R);
      case "Q":
        return define(Addresses.Q);
      default:
        return define("");
    }
  }

  private updatePosition(): void {
    this.prevPosition = clone(this.currPosition);
    const newPosition = clone(this.currBlock?.position);

    HMC_AXES.forEach(axis => {
      if (has(axis, newPosition)) {
        const blockAxisPosition = get(axis, newPosition);

        if (
          this.modals[Modals.POSITIONING_MODE] === Modals.INCREMENTAL
        ) {
          newPosition[axis] += parseFloat(blockAxisPosition);
        }

        if (this.modals[Modals.POSITIONING_MODE] === Modals.ABSOLUTE) {
          newPosition[axis] = parseFloat(blockAxisPosition);
        }
      }
    });
  }
}
