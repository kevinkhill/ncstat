"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcParser = void 0;

var _fp = require("lodash/fp");

var _lib = require("@/lib");

var _NcLexer = require("@/NcLexer");

var _NcProgram = require("@/NcProgram");

var _NcService = require("@/NcService");

var _NcSpec = require("@/NcSpec");

var _types = require("@/types");

var _lib2 = require("./lib");

var _NcBlock = require("./NcBlock");

var _NcEventEmitter = require("./NcEventEmitter");

const isIdle = (0, _fp.eq)(_NcService.NcMachineState.IDLE);
const isToolpathing = (0, _fp.eq)(
  _NcService.NcMachineState.TOOLPATHING
);
const isInCannedCycle = (0, _fp.eq)(
  _NcService.NcMachineState.IN_CANNED_CYCLE
);
const debug = (0, _lib.makeDebugger)("parser");
/**
 * NcParser Class
 */

class NcParser extends _NcEventEmitter.NcEventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // @TODO get this to work with `typeof NcService`;
  constructor(config) {
    super();
    this.config = NcParser.defaults;
    this.lexer = void 0;
    this.program = void 0;
    this.machine = void 0;
    this.state = "IDLE";
    this.currToolpath = void 0;
    this.currBlock = null;
    this.prevBlock = null;
    this.currPosition = {
      X: 0,
      Y: 0,
      Z: 0,
      B: 0
    };
    this.prevPosition = {
      X: 0,
      Y: 0,
      Z: 0,
      B: 0
    };
    this.modals = {
      GROUP_01: _NcSpec.Modals.RAPID,
      GROUP_02: _NcSpec.Modals.XY,
      GROUP_03: _NcSpec.Modals.ABSOLUTE,
      GROUP_05: "",
      GROUP_06: "",
      GROUP_07: "",
      GROUP_08: "",
      GROUP_10: "",
      GROUP_12: ""
    };
    this.config = { ...this.config, ...config }; // if (this.config.debug) {
    //   Debug.enable("ncstat:*");
    // }

    this.lexer = new _NcLexer.NcLexer(this.config.lexerConfig);
    this.program = new _NcProgram.NcProgram();
    this.currToolpath = new _NcProgram.Toolpath(); // @TODO Bubble this event?
    // this.lexer.on("token", token => this.$emitToken(token));

    this.machine = _NcService.NcService;
    this.machine.subscribe(state => {
      this.$emitStateChange({
        prev: this.state,
        curr: state.value
      });
      debug.extend("state")(`%o => %o`, this.state, state.value);
      this.state = state.value;
    });
  }

  getLexer() {
    return this.lexer;
  }

  parse(source) {
    this.machine.start();

    for (const block of this.yieldBlocks(source)) {
      var _this$prevBlock;

      this.currBlock = block;
      debug.extend("block")(
        `%o tokens <%s>`,
        this.currBlock.length,
        this.currBlock
      );

      if (!(0, _fp.isEmpty)(this.currBlock.modals)) {
        this.updateModals();
      }

      if (this.currBlock.M) {
        this.handleMcode();
      } // Example: O2134 ( NAME )

      if (this.currBlock.O) {
        debug.extend("program")("Number: %o", this.currBlock.O);
        this.program.number = this.currBlock.O;

        if (this.currBlock.comment) {
          this.setProgramName(this.currBlock.comment);
        }
      } // Example: ( NAME )

      if (
        ((_this$prevBlock = this.prevBlock) === null ||
        _this$prevBlock === void 0
          ? void 0
          : _this$prevBlock.O) === this.program.number &&
        this.program.name === null &&
        this.currBlock.comment
      ) {
        this.setProgramName(this.currBlock.comment);
      }

      if (this.currBlock.$has("S")) {
        debug("[ ADDR] Spindle speed = %d", this.currBlock.S);
        this.currToolpath.setSetRpms(this.currBlock.S);
      }

      if (this.currBlock.$has("F")) {
        debug("[ ADDR] Feedrate = %d", this.currBlock.F);
      }

      if (this.currBlock.$has("R")) {
        debug("[ ADDR] Retract Plane: %d", this.currBlock.R);
      }

      if (this.currBlock.hasMovement) {
        this.updatePosition(this.currBlock.position);
      }

      if (
        this.currBlock.isStartOfCannedCycle &&
        isToolpathing(this.state)
      ) {
        this.startCannedCycle();
      }

      if (isInCannedCycle(this.state)) {
        if (this.currBlock.gCodes.includes("G80")) {
          // debug("[ STOP] End of canned cycle");
          this.machine.send("END_CANNED_CYCLE");
        }

        if (this.currBlock.hasMovement) {
          const point = (0, _fp.clone)(this.currPosition);
          const lastCC = (0, _fp.last)(this.currToolpath.cannedCycles);
          lastCC.addPoint(point);
        }
      } // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts

      if (this.currBlock.toString().startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.machine.send("END_TOOLPATH");
          this.program.toolpaths.push(this.currToolpath);
        }

        if (isIdle(this.state)) {
          this.machine.send("START_TOOLPATH");
          this.currToolpath = new _NcProgram.Toolpath();

          const tool = _NcProgram.Tool.create({
            number: this.currBlock.N,
            desc: this.currBlock.comment
          });

          this.currToolpath.setTool(tool);
        }
      }

      if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
        if ([8, 50].includes(this.currBlock.M)) {
          this.currToolpath.hasCoolant = true;
        }
        /**
         * Override N line tool description with Txx Mxx ()
         * Move the N line desc to this.currToolpath.desc
         */

        if (this.currBlock.hasToolChange) {
          if (this.currToolpath.tool) {
            if (this.currBlock.T) {
              this.currToolpath.tool.number = this.currBlock.T;
            }

            if (this.currBlock.comment) {
              var _this$currToolpath, _this$currToolpath$to;

              this.currToolpath.description =
                (_this$currToolpath = this.currToolpath) === null ||
                _this$currToolpath === void 0
                  ? void 0
                  : (_this$currToolpath$to =
                      _this$currToolpath.tool) === null ||
                    _this$currToolpath$to === void 0
                  ? void 0
                  : _this$currToolpath$to.desc;
            }
          }

          this.currToolpath.addBlock(this.currBlock);
        }
      } // this.$emitBlock(block);

      this.prevBlock = this.currBlock;
      this.program.appendBlock(this.currBlock);
    } // end-of-for

    this.machine.send("END_TOOLPATH");
    this.machine.stop();
    this.prevBlock = null;
    this.currBlock = null;
    this.program.toolpaths.push(this.currToolpath);
    return this.program;
  }

  *yieldBlocks(input) {
    let lineTokens = [];

    for (const token of this.lexer.tokenize(input)) {
      lineTokens.push(token);

      if (token.type === _types.Tokens.NEWLINE) {
        yield _NcBlock.NcBlock.create(lineTokens);
        lineTokens = [];
      }
    }
  }

  handleMcode() {
    var _this$currBlock;

    const addr = new _lib2.Mcode(
      (_this$currBlock = this.currBlock) === null ||
      _this$currBlock === void 0
        ? void 0
        : _this$currBlock.M
    );
    this.$emitM(addr);
  }

  updateModals() {
    var _this$currBlock2, _this$currBlock3;

    this.modals = {
      ...this.modals,
      ...((_this$currBlock2 = this.currBlock) === null ||
      _this$currBlock2 === void 0
        ? void 0
        : _this$currBlock2.modals)
    };
    debug.extend("modal")(
      `%o`,
      (_this$currBlock3 = this.currBlock) === null ||
        _this$currBlock3 === void 0
        ? void 0
        : _this$currBlock3.modals
    );
  }

  setProgramName(name) {
    debug.extend("program")(`Name: %o`, name);
    this.program.name = name;
  }

  startCannedCycle() {
    this.machine.send("START_CANNED_CYCLE");

    const cannedCycle = _NcProgram.CannedCycle.fromBlock(
      this.currBlock
    );

    debug.extend("canned-cycle")(
      "%s %o",
      cannedCycle.definition.desc,
      cannedCycle.cycleCommand
    );
    this.currToolpath.addCannedCycle(cannedCycle);
  }

  updatePosition(newPosition) {
    const motionCode = this.modals.GROUP_03;
    this.prevPosition = (0, _fp.clone)(this.currPosition); // Helper function to use the positioning modes as function names
    // for their operations in updating positions

    const move = {
      [_NcSpec.Modals.ABSOLUTE]: (_from, to) => to,
      [_NcSpec.Modals.INCREMENTAL]: (from, to) => from + to
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

    const movement = {
      from: this.prevPosition,
      to: this.currPosition
    };
    this.$emitMovement(movement);
    const debugMove = debug.extend("move");
    debugMove("%s", _NcSpec.G_CODE_TABLE[motionCode].desc);
    debugMove("%o", movement.from);
    debugMove("%o", movement.to);
  }
}

exports.NcParser = NcParser;
NcParser.defaults = {
  debug: false,
  lexerConfig: _NcLexer.NcLexer.defaults
};
