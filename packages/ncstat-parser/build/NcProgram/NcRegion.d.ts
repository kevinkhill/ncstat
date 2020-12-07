import { NcBlock } from "../NcParser";
/**
 * @TODO A Builder?
 */
export declare class NcRegion {
    blocks: NcBlock[];
    static create(blocks: NcBlock[]): NcRegion;
    start: number;
    end: number;
    /**
     * The "sourceLine - 1" is to ignore "%" as a line when referencing
     * program lines, not literal lines.
     */
    constructor(blocks?: NcBlock[]);
    get length(): number;
    push(block: NcBlock): this;
    toString(): string;
    toArray(): string[];
}
//# sourceMappingURL=NcRegion.d.ts.map