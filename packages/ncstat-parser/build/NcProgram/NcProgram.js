"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcProgram = exports.HEADER_START_LINE = void 0;
const fp_1 = require("lodash/fp");
const lib_1 = require("../lib");
const NcRegion_1 = require("./NcRegion");
exports.HEADER_START_LINE = 2;
class NcProgram {
    constructor() {
        this.blocks = [];
        this.toolpaths = [];
        this.name = null;
        this.defaults = {
            headerSeparator: " - ",
            ignoreProgramDelimeters: true // This will ignore "%" as line #1
        };
    }
    // constructor() {}
    get tokens() {
        return this.blocks.reduce((tokens, block) => {
            return [...tokens, ...block.tokens];
        }, []);
    }
    get tokenCount() {
        return this.tokens.length;
    }
    get blockCount() {
        return this.blocks.length;
    }
    get toolpathCount() {
        return this.toolpaths.length;
    }
    get toolchangeCount() {
        return this.blocks.reduce((total, block) => {
            if (block.hasToolCall && block.hasToolChange) {
                return 1 + total;
            }
            return total;
        }, 0);
    }
    // get toollist(): any[] {
    //   return map(
    //     (path: Toolpath) => path.tool,
    //     this.getToolPathsWithTools()
    //   );
    // }
    get header() {
        const header = this.getHeader();
        return header.reduce((accum, line) => {
            const [key, value] = line.split(this.defaults.headerSeparator);
            accum[key] = value;
            return accum;
        }, {});
    }
    get g10s() {
        return this.reduceToArray((uses, block) => {
            if (block.gCodes.includes("G10")) {
                uses.push(block.toString());
            }
            return uses;
        });
    }
    // get g10s(): string[] {
    //   return reduce(
    //     (uses, block: NcBlock) => {
    //       if (block.gCodes.includes("G10")) {
    //         uses.push(block.toString());
    //       }
    //       return uses;
    //     },
    //     [] as string[],
    //     this.blocks
    //   );
    // }
    get uses() {
        return this.blocks.reduce((uses, block) => {
            if (block.comment && block.comment.startsWith("USE")) {
                const useText = block.comment.replace(/^USE/, "").trim();
                uses.push(useText);
            }
            return uses;
        }, []);
    }
    get offsets() {
        return this.blocks.reduce((accum, block) => {
            if (block.workOffset) {
                accum.push(block.workOffset);
            }
            return accum;
        }, []);
    }
    get limits() {
        return {
            B: this.getAxisLimits("B"),
            X: this.getAxisLimits("X"),
            Y: this.getAxisLimits("Y"),
            Z: this.getAxisLimits("Z")
        };
    }
    get regionSpans() {
        const regionSpans = [];
        [...this.blankLines, this.blockCount].forEach((lineNumber) => {
            var _a, _b;
            regionSpans.push({
                from: ((_b = (_a = regionSpans[regionSpans.length - 1]) === null || _a === void 0 ? void 0 : _a.to) !== null && _b !== void 0 ? _b : 0) + 2,
                to: lineNumber - 1
            });
        });
        return regionSpans;
    }
    /**
     * Get an array of all the blank line numbers in the program
     *
     * The line numbers are based from "%" as line #0
     */
    get blankLines() {
        return this.blocks.reduce((accum, block) => {
            if (block.isEmpty) {
                accum.push(block.sourceLine);
            }
            return accum;
        }, []);
    }
    /**
     * The number of blank lines in a program
     */
    get blankLineCount() {
        return this.blankLines.length;
    }
    appendBlock(block) {
        this.blocks.push(block);
        return this;
    }
    getAxisValues(axis) {
        const values = fp_1.uniq(fp_1.map(fp_1.get(axis), this.blocks));
        return fp_1.reject(isNaN, values);
    }
    getAxisLimits(axis) {
        var _a, _b;
        const values = this.getAxisValues(axis);
        return {
            min: (_a = fp_1.min(values)) !== null && _a !== void 0 ? _a : NaN,
            max: (_b = fp_1.max(values)) !== null && _b !== void 0 ? _b : NaN
        };
    }
    /**
     * Get a span of blocks, as an array from the program
     *
     * Line numbers are indexed from "%" as line #0
     */
    getLines(from, to) {
        const blocks = this.blocks.slice(from, to + 1);
        // console.log(blocks);
        return blocks;
    }
    // get workOffsets(): number[] {
    //   return this.blocks.map(block => block.tokens).reduce();
    // }
    // get toolpathsWithTools(): Toolpath[] {
    //   return filter("hasTool", this.toolpaths);
    // }
    /**
     * Get the header of the program
     *
     * "header" is defined as the first {@link NcRegion}
     * of comments found in the {@link NcProgram}
     */
    getHeader() {
        /**
         * Starting from "2" will skip over % and the
         * program number, collecting comments until
         * a blank line is found.
         */
        return this.collectCommentsFrom(exports.HEADER_START_LINE);
    }
    /**
     * Get the subheader of the program
     *
     * "subheader" is defined as the second {@link NcRegion};
     * collected comments found in the {@link NcProgram}
     *
     * Starting from the end of the "header" {@link NcRegion},
     * comments are collected until a blank line is found.
     *
     * This is usually a block of G10 lines in H&B
     * posted programs.
     */
    getSubHeader() {
        const endLineNum = exports.HEADER_START_LINE + this.getHeader().length + 1;
        const blocks = this.collectBlocksFrom(endLineNum);
        return blocks.map((block) => block.toString());
    }
    /**
     * Get the notes of the program
     *
     * "notes" is defined as a third {@link NcRegion};
     * collected comments found in the {@link NcProgram}
     *
     * Starting from the end of the "subheader" {@link NcRegion},
     * comments are collected until a blank line is found.
     */
    getNotes() {
        const endLineNum = exports.HEADER_START_LINE +
            (this.getHeader().length + 1) +
            (this.getSubHeader().length + 1);
        return this.collectCommentsFrom(endLineNum);
    }
    /**
     * Create a {@link NcRegion} from a span of lines
     */
    getRegion(from, to) {
        return NcRegion_1.NcRegion.create(this.getLines(from, to));
    }
    /**
     * Parse the program for blank lines and slice into {@link NcRegion}
     */
    getRegions() {
        return this.regionSpans.map(({ from, to }) => this.getRegion(from, to));
    }
    // getRegionFromLine(_lineNumber: number): any {
    //   return {};
    // }
    /**
     * Summary of the {@link NcProgram}
     */
    getStats() {
        return {
            limits: this.limits,
            // workOffsets: this.getWorkOffsets(),
            tokens: { count: this.tokenCount },
            blocks: { count: this.blockCount },
            toolpaths: { count: this.toolpathCount },
            toolchanges: { count: this.toolchangeCount }
        };
    }
    getTools() {
        return this.toolpaths.map((toolpath) => toolpath.tool);
    }
    getToolpaths() {
        return this.toolpaths;
    }
    getToolpath(index) {
        return this.toolpaths[index];
    }
    queryHeader(searchKey) {
        const header = this.getHeader();
        const comment = header.find((c) => c.startsWith(searchKey));
        return comment
            ? comment.split(this.defaults.headerSeparator)[1]
            : undefined;
    }
    toString() {
        return this.blocks.join("\n");
    }
    toStringWithLineNumbers() {
        return this.blocks
            .map((value, index) => `N${lib_1.zeroPad(index)} ${value}`)
            .join("\n");
    }
    /**
     * Extract lines as a {@link NcRegion}
     *
     * Given a starting line, this method will consume
     * {@link NcBlock}s until it reaches an empty line.
     */
    // getRegionFromLine(startLine: number): NcRegion {
    //   const getRegion = regionFactory(startLine);
    //   return getRegion(this.blocks);
    // }
    collectCommentsFrom(start) {
        const comments = [];
        for (const block of this.blocks.slice(start)) {
            if (block.isEmpty)
                break;
            if (block.comment)
                comments.push(block === null || block === void 0 ? void 0 : block.comment);
        }
        return comments;
    }
    collectBlocksFrom(start) {
        const blocks = [];
        for (const block of this.blocks.slice(start)) {
            if (block.isEmpty)
                break;
            blocks.push(block);
        }
        return blocks;
    }
    /**
     * Iterate the blocks with a reducer
     */
    reduceToArray(reducer) {
        return this.blocks.reduce(reducer, []);
    }
}
exports.NcProgram = NcProgram;
//# sourceMappingURL=NcProgram.js.map