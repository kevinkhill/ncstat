"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcRegion = void 0;
/**
 * @TODO A Builder?
 */
class NcRegion {
    /**
     * The "sourceLine - 1" is to ignore "%" as a line when referencing
     * program lines, not literal lines.
     */
    constructor(blocks = []) {
        this.blocks = blocks;
        this.blocks = blocks;
        if (blocks.length > 0) {
            this.start = blocks[0].sourceLine;
            this.end = blocks[blocks.length - 1].sourceLine;
        }
    }
    static create(blocks) {
        return new NcRegion(blocks);
    }
    get length() {
        return this.blocks.length;
    }
    push(block) {
        this.blocks.push(block);
        return this;
    }
    toString() {
        return this.blocks.map((block) => block.toString()).join("\n");
    }
    toArray() {
        return this.blocks.reduce((blocks, block) => {
            if (block.comment && block.isCommentBlock) {
                blocks.push(block.comment);
            }
            else {
                blocks.push(block.toString());
            }
            return blocks;
        }, []);
    }
}
exports.NcRegion = NcRegion;
//# sourceMappingURL=NcRegion.js.map