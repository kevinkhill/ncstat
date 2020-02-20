"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toolpath = void 0;

class Toolpath {
  static fromTool(tool) {
    const toolpath = new Toolpath();
    return toolpath.setTool(tool);
  }

  constructor(blocks = []) {
    this.blocks = blocks;
    this.tool = void 0;
    this.hasCoolant = false;
    this.description = void 0;
    this.cannedCycles = [];
    this.blocks = blocks;
  }

  get hasTool() {
    return this.tool !== undefined;
  }

  setTool(tool) {
    this.tool = tool;
    return this;
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
