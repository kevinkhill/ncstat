import { get, map, max, min, reject, uniq } from "lodash/fp";

import { zeroPad } from "@/lib";
import { NcToken } from "@/NcLexer/NcToken";
import { NcBlock } from "@/NcParser";
import {
  AxesLimits,
  AxisLimits,
  HmcAxis,
  ProgramStats,
  StringDict
} from "@/types";

import { NcRegion } from "./NcRegion";
import { Tool, Toolpath } from "./Toolpath";

export const HEADER_START_LINE = 2;

export class NcProgram {
  readonly blocks: NcBlock[] = [];
  readonly toolpaths: Toolpath[] = [];

  name: string | null = null;
  number!: number;
  defaults = {
    headerSeparator: " - "
  };
  // constructor() {}

  get tokens(): NcToken[] {
    return this.blocks.reduce((tokens, block) => {
      return [...tokens, ...block.tokens];
    }, [] as NcToken[]);
  }

  get tokenCount(): number {
    return this.tokens.length;
  }

  get blockCount(): number {
    return this.blocks.length;
  }

  get toolpathCount(): number {
    return this.toolpaths.length;
  }

  get toolchangeCount(): number {
    return this.blocks.reduce((total: number, block: NcBlock) => {
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

  get header(): StringDict {
    const header = this.getHeader();

    return header.reduce((accum, line) => {
      const [key, value] = line.split(this.defaults.headerSeparator);

      accum[key] = value;

      return accum;
    }, {} as StringDict);
  }

  get g10s(): string[] {
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

  get uses(): string[] {
    return this.blocks.reduce((uses, block: NcBlock) => {
      if (block.comment && block.comment.startsWith("USE")) {
        const useText = block.comment.replace(/^USE/, "").trim();

        uses.push(useText);
      }

      return uses;
    }, [] as string[]);
  }

  get offsets(): string[] {
    return this.blocks.reduce((accum: string[], block: NcBlock) => {
      if (block.workOffset) {
        accum.push(block.workOffset);
      }

      return accum;
    }, [] as string[]);
  }

  get limits(): AxesLimits {
    return {
      B: this.getAxisLimits("B"),
      X: this.getAxisLimits("X"),
      Y: this.getAxisLimits("Y"),
      Z: this.getAxisLimits("Z")
    };
  }

  // get workOffsets(): number[] {
  //   return this.blocks.map(block => block.tokens).reduce();
  // }

  // get toolpathsWithTools(): Toolpath[] {
  //   return filter("hasTool", this.toolpaths);
  // }

  getRegion(start: number, end: number): NcRegion {
    return NcRegion.create(this.blocks)
      .start(start)
      .endAt(block => {
        return block.lineNumber === end;
      })
      .collect();
  }

  /**
   * Get the header of the program
   *
   * "header" is defined as the first group of
   * comments found in the {@link NcProgram}
   */
  getHeader(): string[] {
    /**
     * Starting from "2" will skip over % and the
     * program number, collecting comments until
     * a blank line is found.
     */
    return this.collectCommentsFrom(HEADER_START_LINE);
  }

  /**
   * Get the subheader of the program
   *
   * "subheader" is defined as the second group of
   * comments found in the {@link NcProgram}
   *
   * Starting from the end of the "header"
   * comments are collected until a blank
   * line is found.
   *
   * This is usually a block of G10 lines in H&B
   * posted programs.
   */
  getSubHeader(): string[] {
    const endLineNum = HEADER_START_LINE + this.getHeader().length + 1;
    const blocks = this.collectBlocksFrom(endLineNum);

    return blocks.map(block => block.toString());
  }

  /**
   * Get the notes of the program
   *
   * "notes" is defined as the third group of
   * comments found in the {@link NcProgram}
   *
   * Starting from the end of the "subheader"
   * comments are collected until a blank
   * line is found.
   */
  getNotes(): string[] {
    const endLineNum =
      HEADER_START_LINE +
      (this.getHeader().length + 1) +
      (this.getSubHeader().length + 1);

    return this.collectCommentsFrom(endLineNum);
  }

  getTools(): Tool[] {
    return this.toolpaths.map(toolpath => toolpath.tool);
  }

  getToolpaths(): Toolpath[] {
    return this.toolpaths;
  }

  getToolpath(index: number): Toolpath {
    return this.toolpaths[index];
  }

  getAxisValues(axis: HmcAxis): number[] {
    const values: number[] = uniq(map(get(axis), this.blocks));

    return reject(isNaN, values);
  }

  getAxisLimits(axis: HmcAxis): AxisLimits {
    const values = this.getAxisValues(axis);

    return {
      min: min(values) ?? NaN,
      max: max(values) ?? NaN
    };
  }

  getStats(): ProgramStats {
    return {
      limits: this.limits,
      // workOffsets: this.getWorkOffsets(),
      tokens: { count: this.tokenCount },
      blocks: { count: this.blockCount },
      toolpaths: { count: this.toolpathCount },
      toolchanges: { count: this.toolchangeCount }
    };
  }

  appendBlock(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }

  // prependBlock(block: NcBlock): this {
  //   this.blocks.unshift(block);

  //   return this;
  // }

  // loadBlocks(blocks: Iterable<NcBlock>): this {
  //   this.blocks.push(...blocks);

  //   return this;
  // }

  withBlocks(fn: (block: NcBlock) => void): void {
    return this.blocks.forEach(fn);
  }

  queryHeader(searchKey: string): string | undefined {
    const header = this.getHeader();
    const comment = header.find(c => c.startsWith(searchKey));

    return comment
      ? comment.split(this.defaults.headerSeparator)[1]
      : undefined;
  }

  toString(): string {
    return this.blocks.join("\n");
  }

  toStringWithLineNumbers(): string {
    return this.blocks
      .map((value, index) => `N${zeroPad(index)} ${value}`)
      .join("\n");
  }

  private collectCommentsFrom(start: number): string[] {
    const comments: string[] = [];

    for (const block of this.blocks.slice(start)) {
      if (block.isEmpty) break;
      if (block.comment) comments.push(block?.comment);
    }

    return comments;
  }

  private collectBlocksFrom(start: number): NcBlock[] {
    const blocks: NcBlock[] = [];

    for (const block of this.blocks.slice(start)) {
      if (block.isEmpty) break;
      blocks.push(block);
    }

    return blocks;
  }

  /**
   * Create a NcRegion from a start line and end test
   *
   * Given a starting line and a predicate that will
   * test the block for an end condition.
   */
  createRegion(
    start: number,
    endTest?: (block: NcBlock) => boolean
  ): NcRegion {
    const region = new NcRegion();

    const endFn = endTest ?? NcBlock.test.isEmptyBlock;

    for (const block of this.blocks.slice(start)) {
      if (endFn(block)) break;
      region.push(block);
    }

    return region;
  }

  /**
   * Itterate the blocks with a reducer
   */
  private reduceToArray(
    reducer: (
      previousValue: string[],
      currentValue: NcBlock,
      currentIndex: number,
      array: NcBlock[]
    ) => string[]
  ): string[] {
    return this.blocks.reduce(reducer, [] as string[]);
  }
}
