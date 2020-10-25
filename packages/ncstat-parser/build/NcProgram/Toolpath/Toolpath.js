"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolpath = void 0;

var _lib = require("@/lib");

var _NcRegion = require("../NcRegion");

var _Tool = require("./Tool");

const debug = (0, _lib.makeDebugger)("parser:toolpath");

class Toolpath extends _NcRegion.NcRegion {
  static fromTool(tool) {
    const toolpath = new Toolpath();
    return toolpath.setTool(tool);
  }

  constructor(blocks = []) {
    super(blocks);
    this.blocks = blocks;
    this.rpms = void 0;
    this.description = void 0;
    this.tool = new _Tool.Tool();
    this.hasCoolant = false;
    this.cannedCycles = [];
    debug("Creating toolpath");
  }

  get hasTool() {
    return this.tool !== undefined;
  }

  setTool(tool) {
    this.tool = tool;
    return this;
  }

  setSetRpms(rpms) {
    this.rpms = rpms;
  }

  addBlock(block) {
    this.blocks.push(block);
    return this;
  } // get hasFeedrates(): boolean {
  //   return this.lines.some(line => FEEDRATE_REGEX.test(line));
  // }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // getFeedrates(): number[] {
  //   return map(
  //     (line: string) => parseFloat(regexExtract(FEEDRATE_REGEX, line)),
  //     filter(FEEDRATE_REGEX.test, this.lines)
  //   );
  // }

  addCannedCycle(cycle) {
    this.cannedCycles.push(cycle);
    return this;
  }

  getCannedCycleCount() {
    return this.cannedCycles.length;
  }
}

exports.Toolpath = Toolpath;
