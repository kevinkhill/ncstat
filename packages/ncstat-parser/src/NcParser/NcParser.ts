import Debug from "debug";
import { clone, eq, last } from "lodash/fp";

import { NcLexer, NcToken } from "@/NcLexer";
import { CannedCycle, NcProgram, Tool, Toolpath } from "@/NcProgram";
import {
  NcMachineState,
  NcMachineStateType,
  NcService
} from "@/NcService";
import {
  define,
  defineGCode,
  defineMCode,
  G_CODE_TABLE,
  Modals
} from "@/NcSpec";
import { Addresses } from "@/NcSpec/addresses";
import {
  CodeDefinition,
  ModalGroups,
  MovementEvent,
  NcParserConfig,
  NcPosition
} from "@/types";

import { NcBlock } from "./NcBlock";
import { blockGenerator } from "./NcBlock/blockGenerator";
import { NcEventEmitter } from "./NcEventEmitter";

const isIdle = eq(NcMachineState.IDLE);
const isToolpathing = eq(NcMachineState.TOOLPATHING);
const isInCannedCycle = eq(NcMachineState.IN_CANNED_CYCLE);

/**
 * NcParser Class
 */
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
  private state: NcMachineStateType = "IDLE";
  private currToolpath!: Toolpath;
  private readonly debug = Debug(NcParser.namespace);

  private currBlock: NcBlock | null = null;
  private prevBlock: NcBlock | null = null;

  private currPosition: NcPosition = { X: 0, Y: 0, Z: 0, B: 0 };
  private prevPosition: NcPosition = { X: 0, Y: 0, Z: 0, B: 0 };

  private modals: ModalGroups = {
    [Modals.MOTION_CODES]: Modals.RAPID,
    GROUP_02: Modals.XY,
    GROUP_03: Modals.ABSOLUTE
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

      this.updateModals();

      // Example: O2134 ( NAME )
      if (this.currBlock.O) {
        this.debug("[ PRG ] Number: %d", this.currBlock.O);
        this.program.number = this.currBlock.O;

        if (this.currBlock.comment) {
          this.setProgramName(this.currBlock.comment);
        }
      }

      // Example: ( NAME )
      if (
        this.prevBlock?.O === this.program.number &&
        this.program.name === null &&
        this.currBlock.comment
      ) {
        this.setProgramName(this.currBlock.comment);
      }

      if (this.currBlock.$has("S")) {
        this.debug("[ ADDR] Spindle speed = %d", this.currBlock.S);
        // this.currToolpath.spindleSpeed;
      }

      if (this.currBlock.$has("F")) {
        this.debug("[ ADDR] Feedrate = %d", this.currBlock.F);
      }

      if (this.currBlock.hasMovement) {
        this.updatePosition(this.currBlock.position);
      }

      if (
        this.currBlock.isStartOfCannedCycle &&
        isToolpathing(this.state)
      ) {
        this.startCannedCycle(this.currBlock);
      }

      if (isInCannedCycle(this.state)) {
        if (this.currBlock.G.includes(80)) {
          this.debug("[ STOP] End of canned cycle");
          this.machine.send("END_CANNED_CYCLE");
        }

        if (this.currBlock.hasMovement) {
          const point = clone(this.currPosition);
          const lastCC = last(
            this.currToolpath.cannedCycles
          ) as CannedCycle;

          lastCC.addPoint(point);
        }
      }

      // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts
      if (this.currBlock.toString().startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.debug("[ STOP] End of toolpath");
          this.machine.send("END_TOOLPATH");
          this.program.toolpaths.push(this.currToolpath);
        }

        if (isIdle(this.state)) {
          this.machine.send("START_TOOLPATH");
          this.debug("[START] Starting toolpath tracking");

          this.currToolpath = new Toolpath();

          this.debug("[ TOOL] Tool definition found");
          // const tool = Tool.create({
          //   number: this.currBlock.N,
          //   desc: this.currBlock.comment
          // });

          // this.currToolpath.setTool(tool);
        }
      }

      if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
        if ([8, 50].includes(this.currBlock.M as number)) {
          this.currToolpath.hasCoolant = true;
        }

        /**
         * Override N line tool description with Txx Mxx ()
         * Move the N line desc to this.currToolpath.desc
         */
        if (this.currBlock.hasToolChange) {
          // if (this.currToolpath.tool) {
          // if (this.currBlock.T) {
          //   this.currToolpath.tool.number = this.currBlock.T;
          // }

          if (this.currBlock.comment) {
            this.currToolpath.description = this.currToolpath?.tool?.desc;
          }
        }

        this.currToolpath.addBlock(this.currBlock);
      }

      this.program.appendBlock(this.currBlock);

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

  private updateModals(): void {
    const groups = [
      Modals.MOTION_CODES,
      Modals.PLANE_SELECTION,
      Modals.POSITIONING_MODE
    ];

    console.log(this.currBlock.modals);

    groups.forEach(group => {
      // console.log(group);
      if (this.currBlock[group]) {
        this.modals[group] = this.currBlock[group];

        this.debug(
          `[MODAL] Setting %s to %s`,
          group,
          this.modals[group]
        );
      }
    });
  }

  private *yieldBlocks(input: string): Generator<NcBlock> {
    yield* blockGenerator(this.lexer.tokenize(input));
  }

  private setProgramName(name: string): void {
    this.debug(`[ PRG ] Name: %s`, name);
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
        return defineMCode(token.value as number);
      case "G":
        return defineGCode(token.value as number);
      case "R":
        return define(Addresses.R);
      case "Q":
        return define(Addresses.Q);
      default:
        return define("");
    }
  }

  private updatePosition(newPosition: Partial<NcPosition>): void {
    const motionCode = this.modals.GROUP_03;

    this.prevPosition = clone(this.currPosition);

    // Helper function to use the positioning modes as function names
    // for their operations in updating positions
    const move = {
      [Modals.ABSOLUTE]: (_from: number, to: number) => to,
      [Modals.INCREMENTAL]: (from: number, to: number) => from + to
    };

    /**
     * Iterate over each axis that has a value from the newPosition
     * using the positioning mode to either increment or set the value
     */
    for (const [axis, value] of Object.entries(newPosition)) {
      if (value) {
        this.currPosition[axis] = move[motionCode](
          this.currPosition[axis],
          value
        );
      }
    }

    const movement: MovementEvent = {
      from: this.prevPosition,
      to: this.currPosition
    };

    this.$emitMovement(movement);

    this.debug("[ MOVE] %s", motionCode, G_CODE_TABLE[motionCode]);
    this.debug("[ FROM] %o", movement.from);
    this.debug("[   TO] %o", movement.to);
  }
}
