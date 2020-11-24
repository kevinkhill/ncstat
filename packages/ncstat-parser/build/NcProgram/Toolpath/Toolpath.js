"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolpath = void 0;
const lib_1 = require("../../lib");
const NcRegion_1 = require("../NcRegion");
const Tool_1 = require("./Tool");
const debug = lib_1.makeDebugger("parser:toolpath");
class Toolpath extends NcRegion_1.NcRegion {
    constructor(blocks = []) {
        super(blocks);
        this.blocks = blocks;
        this.tool = new Tool_1.Tool();
        this.hasCoolant = false;
        this.cannedCycles = [];
        debug("Creating toolpath");
    }
    static fromTool(tool) {
        const toolpath = new Toolpath();
        return toolpath.setTool(tool);
    }
    get hasTool() {
        return this.tool !== undefined;
    }
    setTool(tool) {
        this.tool = tool;
        return this;
    }
    setRpms(rpms) {
        this.rpms = rpms;
    }
    addBlock(block) {
        this.blocks.push(block);
        return this;
    }
    // get hasFeedrates(): boolean {
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
//# sourceMappingURL=Toolpath.js.map