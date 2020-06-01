import { get, map, max, min, reject, uniq } from "lodash/fp";

import { NcToken } from "@/NcLexer/NcToken";
import { getBlockGenerator, NcBlock } from "@/NcParser/NcBlock";
import { Toolpath } from "@/NcProgram/Toolpath";
import { AxesLimits, AxisLimits, HmcAxis, ProgramStats } from "@/types";

export class NcProgram {
  // blocks: Linear<NcBlock> = new Linear<NcBlock>();
  blocks: NcBlock[] = [];
  toolpaths: Toolpath[] = [];

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

  toString(): string {
    return this.blocks.join("\n");
  }

  loadBlocks(blocks: Iterable<NcBlock>): this {
    this.blocks.push(...blocks);

    return this;
  }

  loadTokens(tokens: Iterable<NcToken>): this {
    const blocks = getBlockGenerator(tokens);

    return this.loadBlocks(blocks);
  }

  withBlocks(fn: (block: NcBlock) => void): void {
    return this.blocks.forEach(fn);
  }

  getWorkOffsets(): number[] {
    return this.blocks.map(block => block.tokens).reduce();
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
      workOffsets: this.getWorkOffsets(),
      tokens: { count: this.tokenCount },
      blocks: { count: this.blockCount },
      toolpaths: { count: this.toolpathCount },
      toolchanges: { count: this.toolchangeCount }
    };
  }
}
