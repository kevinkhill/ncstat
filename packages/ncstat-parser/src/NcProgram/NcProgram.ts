import { filter, get, map, max, min, reject, uniq } from "lodash/fp";

import { NcToken } from "@/NcLexer/NcToken";
import { NcBlock } from "@/NcParser";
import { Toolpath } from "@/NcProgram/Toolpath";
import { AxesLimits, AxisLimits, HmcAxis, ProgramStats } from "@/types";

export class NcProgram {
  readonly blocks: NcBlock[] = [];
  readonly toolpaths: Toolpath[] = [];

  name: string | null = null;
  number!: number;

  // constructor() {}

  get tokens(): NcToken[] {
    return this.blocks.reduce((tokens: NcToken[], block: NcBlock) => {
      return [...tokens, ...block.tokens];
    }, []);
  }

  get blockCount(): number {
    return this.blocks.length;
  }

  get tokenCount(): number {
    return this.blocks.reduce((total: number, block: NcBlock) => {
      return total + block.tokenCount;
    }, 0);
  }

  // get toollist(): any[] {
  //   return map(
  //     (path: Toolpath) => path.tool,
  //     this.getToolPathsWithTools()
  //   );
  // }

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

  // get workOffsets(): number[] {
  //   return this.blocks.map(block => block.tokens).reduce();
  // }

  // get toolpathsWithTools(): Toolpath[] {
  //   return filter("hasTool", this.toolpaths);
  // }

  toString(): string {
    return this.blocks.join("\n");
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

  getLimits(): AxesLimits {
    return {
      B: this.getAxisLimits("B"),
      X: this.getAxisLimits("X"),
      Y: this.getAxisLimits("Y"),
      Z: this.getAxisLimits("Z")
    };
  }

  getStats(): ProgramStats {
    return {
      limits: this.getLimits(),
      // workOffsets: this.getWorkOffsets(),
      tokens: { count: this.tokenCount },
      blocks: { count: this.blockCount },
      toolpaths: { count: this.toolpathCount },
      toolchanges: { count: this.toolchangeCount }
    };
  }
}
