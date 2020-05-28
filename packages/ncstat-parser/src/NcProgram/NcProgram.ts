import { Linear } from "doublie";
import { Token } from "ts-tokenizr";

import { getBlockGenerator, NcBlock } from "@/NcBlock";
import { Toolpath, getLimits } from "@/Toolpath";
import {
  ProgramLimits,
  ProgramStats,
  HmcAxis,
  AxisLimits
} from "@/types";
import { path } from "lodash/fp";
import { map, filter, flow, min, max } from "lodash";
import { dedupe } from "@/Toolpath/lib/getAxisLimits";

export class NcProgram {
  blocks: Linear<NcBlock> = new Linear<NcBlock>();
  toolpaths: Array<Toolpath> = [];

  // constructor() {}

  get blockCount(): number {
    return this.blocks.length;
  }

  get tokenCount(): number {
    return (
      this.blocks
        // .toArray()
        .reduce(
          (total: number, block: NcBlock) => total + block.tokenCount,
          0
        )
    );
  }

  get toolpathCount(): number {
    return this.toolpaths.length;
  }

  get toolchangeCount(): number {
    return (
      this.blocks
        // .toArray()
        .reduce((total: number, block: NcBlock) => {
          if (block.hasToolCall && block.hasToolChange) {
            return 1 + total;
          }

          return total;
        }, 0)
    );
  }

  toString(): string {
    return this.blocks.join("\n");
  }

  loadBlocks(blocks: Iterable<NcBlock>): this {
    this.blocks.append(...blocks);

    return this;
  }

  loadTokens(tokens: Iterable<Token>): this {
    const blocks = getBlockGenerator(tokens);

    return this.loadBlocks(blocks);
  }

  withBlocks(fn: (block: NcBlock) => void): Linear<NcBlock> {
    return this.blocks.forEach(fn);
  }

  getAxisLimits(axis: HmcAxis): AxisLimits {
    const getAxisValue = path(`values.${axis}`);
    const axisValueMap = map(getAxisValue);
    const onlyNumbers = filter(Boolean);
    const getUniqAxisValues = flow([onlyNumbers, dedupe, axisValueMap]);

    const axisValues = getUniqAxisValues(this.blocks);

    return {
      axis,
      min: min(axisValues) as number,
      max: max(axisValues) as number
    };
  }

  getLimits(): ProgramLimits {
    const Z = this.blocks.map(block => block.Z).toArray();

    // this.blocks.forEach(block => console.log(block));

    return { Z: Z };
  }

  getStats(): ProgramStats {
    return {
      tokens: { count: this.tokenCount },
      blocks: { count: this.blockCount },
      toolpaths: { count: this.toolpathCount },
      toolchanges: { count: this.toolchangeCount },
      limits: { ...this.getLimits() }
    };
  }
}
