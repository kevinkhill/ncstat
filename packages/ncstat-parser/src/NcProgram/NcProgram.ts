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

import { Tool, Toolpath } from "./Toolpath";

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

  get offsets(): string[] {
    return this.blocks.reduce((accum: string[], block: NcBlock) => {
      if (block.workOffset) {
        accum.push(block.workOffset);
      }

      return accum;
    }, [] as string[]);
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

  toString(): string {
    return this.blocks.join("\n");
  }

  toStringWithLineNumbers(): string {
    return this.blocks
      .map((value, index) => `N${zeroPad(index)} ${value}`)
      .join("\n");
  }

  appendBlock(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }

  prependBlock(block: NcBlock): this {
    this.blocks.unshift(block);

    return this;
  }

  loadBlocks(blocks: Iterable<NcBlock>): this {
    this.blocks.push(...blocks);

    return this;
  }

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

  getHeader(): string[] {
    const header: string[] = [];

    /**
     * Skip over % and program number
     * collect comments until a blank line is found
     */
    for (const block of this.blocks.slice(2)) {
      if (block.comment) header.push(block?.comment);
      if (block.isEmpty) break;
    }

    return header;
  }

  getTools(): Tool[] {
    return this.toolpaths.map(toolpath => toolpath.tool);
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
}
