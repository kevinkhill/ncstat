"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolpath = void 0;

var _fp = require("lodash/fp");

var _NcBlock = require("../NcBlock");

class Toolpath {
  constructor() {
    this.tool = void 0;
    this.hasCoolant = false;
    this.blocks = [];
    this.description = void 0;
    this.cannedCycles = [];
  }

  static fromTool(tool) {
    const toolpath = new Toolpath();
    return toolpath.setTool(tool);
  }

  static parse(multiline) {
    const toolpath = new Toolpath();
    (0, _fp.forEach)(
      line => toolpath.parseLine(line),
      multiline.split(/\r?\n/g)
    );
    return toolpath;
  }

  get hasTool() {
    return this.tool !== undefined;
  }

  setTool(tool) {
    this.tool = tool;
    return this;
  }

  pushBlock(block) {
    this.blocks.push(block);
    return this;
  }

  parseLine(line) {
    this.pushBlock(_NcBlock.NcBlock.parse(line));
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
