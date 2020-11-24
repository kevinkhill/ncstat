import { NcToken } from "../NcLexer";
import { NcBlock } from "../NcParser";
import { AxesLimits, AxisLimits, HmcAxis, LineSpan, ProgramStats, StringDict } from "../types";
import { NcRegion } from "./NcRegion";
import { Tool, Toolpath } from "./Toolpath";
export declare const HEADER_START_LINE = 2;
export declare class NcProgram {
    readonly blocks: NcBlock[];
    readonly toolpaths: Toolpath[];
    name: string | null;
    number: number;
    defaults: {
        headerSeparator: string;
        ignoreProgramDelimeters: boolean;
    };
    get tokens(): NcToken[];
    get tokenCount(): number;
    get blockCount(): number;
    get toolpathCount(): number;
    get toolchangeCount(): number;
    get header(): StringDict;
    get g10s(): string[];
    get uses(): string[];
    get offsets(): string[];
    get limits(): AxesLimits;
    get regionSpans(): LineSpan[];
    /**
     * Get an array of all the blank line numbers in the program
     *
     * The line numbers are based from "%" as line #0
     */
    get blankLines(): number[];
    /**
     * The number of blank lines in a program
     */
    get blankLineCount(): number;
    appendBlock(block: NcBlock): this;
    getAxisValues(axis: HmcAxis): number[];
    getAxisLimits(axis: HmcAxis): AxisLimits;
    /**
     * Get a span of blocks, as an array from the program
     *
     * Line numbers are indexed from "%" as line #0
     */
    getLines(from: number, to: number): NcBlock[];
    /**
     * Get the header of the program
     *
     * "header" is defined as the first {@link NcRegion}
     * of comments found in the {@link NcProgram}
     */
    getHeader(): string[];
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
    getSubHeader(): string[];
    /**
     * Get the notes of the program
     *
     * "notes" is defined as a third {@link NcRegion};
     * collected comments found in the {@link NcProgram}
     *
     * Starting from the end of the "subheader" {@link NcRegion},
     * comments are collected until a blank line is found.
     */
    getNotes(): string[];
    /**
     * Create a {@link NcRegion} from a span of lines
     */
    getRegion(from: number, to: number): NcRegion;
    /**
     * Parse the program for blank lines and slice into {@link NcRegion}
     */
    getRegions(): NcRegion[];
    /**
     * Summary of the {@link NcProgram}
     */
    getStats(): ProgramStats;
    getTools(): Tool[];
    getToolpaths(): Toolpath[];
    getToolpath(index: number): Toolpath;
    queryHeader(searchKey: string): string | undefined;
    toString(): string;
    toStringWithLineNumbers(): string;
    /**
     * Extract lines as a {@link NcRegion}
     *
     * Given a starting line, this method will consume
     * {@link NcBlock}s until it reaches an empty line.
     */
    private collectCommentsFrom;
    private collectBlocksFrom;
    /**
     * Iterate the blocks with a reducer
     */
    private reduceToArray;
}
//# sourceMappingURL=NcProgram.d.ts.map