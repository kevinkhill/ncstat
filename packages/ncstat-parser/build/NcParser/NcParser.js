"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcParser = void 0;

var _lexer = require("@ncstat/lexer");

var _doublie = require("doublie");

var _fp = require("lodash/fp");

var _NcBlock = require("../NcBlock");

var _NcService = require("../NcService");

var _Toolpath = require("../Toolpath");

var _codes = require("./codes");

var _lib = require("./lib");

var _NcEventEmitter = require("./NcEventEmitter");

const isIdle = (0, _fp.eq)(_NcService.NcMachineState.IDLE);
const isToolpathing = (0, _fp.eq)(
  _NcService.NcMachineState.TOOLPATHING
);
const isInCannedCycle = (0, _fp.eq)(
  _NcService.NcMachineState.IN_CANNED_CYCLE
);

class NcParser extends _NcEventEmitter.NcEventEmitter {
  /**
   * Settings
   */

  /**
     Proram Vars
    */

  /**
   * Parser Vars
   */

  /**
   * Internals
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor({ debug }) {
    super();
    this.debug = false;
    this.programNumber = NaN;
    this.programTitle = "";
    this.program = new _doublie.Linear();
    this.toolpaths = [];
    this.blocks = [];
    this.nc = void 0;
    this.state = _NcService.NcMachineState.IDLE;
    this.lexer = void 0;
    this.tokens = [];
    this.debug = Boolean(debug);
    this.lexer = new _lexer.NcLexer({
      debug: this.debug
    });
    this.nc = _NcService.NcService;
    this.nc.subscribe(state => {
      this.$emitStateChange({
        prev: this.state,
        curr: state.value
      });
      this.state = state.value;
    });
  }

  toString() {
    return `%\n${this.program.join("\n")}%`;
  } // get lines(): string[] {
  //   return map(Object.toString, this.blocks);
  // }

  getLexer() {
    return this.lexer;
  }

  getLimits() {
    return {
      X: (0, _Toolpath.getLimits)("X")(this.toolpaths),
      Y: (0, _Toolpath.getLimits)("Y")(this.toolpaths),
      Z: (0, _Toolpath.getLimits)("Z")(this.toolpaths)
    };
  }

  get toolpathCount() {
    return this.toolpaths.length;
  }

  getToolPathsWithTools() {
    return (0, _fp.filter)("hasTool", this.toolpaths);
  } // getToolList(): Array<> {
  //   return map(
  //     (path: Toolpath) => path.tool,
  //     this.getToolPathsWithTools()
  //   );
  // }

  parse(source) {
    this.tokens = this.lexer.tokenArray(source);
    this.blocks = (0, _NcBlock.getBlockGenerator)(this.tokens); //@TODO move this to the end?

    this.program.append(...this.blocks);
    let toolpath = new _Toolpath.Toolpath();
    let modals = {
      [_codes.Modals.MOTION_CODES]: _codes.Modals.RAPID,
      [_codes.Modals.PLANE_SELECTION]: "G17",
      [_codes.Modals.POSITIONING_MODE]: _codes.Modals.ABSOLUTE
    };
    let position = {
      curr: {
        X: 0,
        Y: 0,
        Z: 0,
        B: 0
      },
      prev: {
        X: 0,
        Y: 0,
        Z: 0,
        B: 0
      }
    };
    this.nc.start();
    /**
     * Run the program
     */

    this.program.forEach(block => {
      modals = Object.assign(modals, (0, _lib.getModals)(block));
      this.programNumber = block.O;
      this.programTitle = block.comment;

      if (block.hasMovement) {
        const newPosition = (0, _lib.updatePosition)(
          position,
          modals[_codes.Modals.POSITIONING_MODE],
          block
        );
        position = Object.assign(position, newPosition);
      }

      if (block.isStartOfCannedCycle && isToolpathing(this.state)) {
        this.nc.send("START_CANNED_CYCLE");

        const cannedCycle = _Toolpath.CannedCycle.fromBlock(block);

        toolpath.addCannedCycle(cannedCycle);
      }

      if (isInCannedCycle(this.state)) {
        if (block.G.includes(80)) {
          this.nc.send("END_CANNED_CYCLE");
        }

        if (block.hasMovement) {
          const point = (0, _fp.clone)(position.curr);
          const lastCC = (0, _fp.last)(toolpath.cannedCycles);
          lastCC.addPoint(point);
        }
      } // Tracking toolpaths (tools) via Nxxx lines with a comment
      // This has been defined in the custom H&B posts

      if (block.toString().startsWith("N")) {
        if (isToolpathing(this.state)) {
          this.nc.send("END_TOOLPATH");
          this.toolpaths.push(toolpath);
        }

        if (isIdle(this.state)) {
          toolpath = new _Toolpath.Toolpath();

          const tool = _Toolpath.Tool.create({
            number: block.N,
            desc: block.comment
          });

          toolpath.setTool(tool);
          this.nc.send("START_TOOLPATH");
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
            var _toolpath, _toolpath$tool;

            toolpath.description =
              (_toolpath = toolpath) === null || _toolpath === void 0
                ? void 0
                : (_toolpath$tool = _toolpath.tool) === null ||
                  _toolpath$tool === void 0
                ? void 0
                : _toolpath$tool.desc;
          }
        }

        toolpath.addBlock(block);
      }
    });
    this.nc.send("END_TOOLPATH");
    this.nc.stop();
    this.toolpaths.push(toolpath);
    return this.program;
  }
}

exports.NcParser = NcParser;
