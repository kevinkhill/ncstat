import { Linear } from "doublie";
import { filter, flow, map, max, min } from "lodash";
import { path } from "lodash/fp";
import { Token } from "ts-tokenizr";

import { getBlockGenerator, NcBlock } from "@/NcBlock";
import { getLimits, Toolpath } from "@/Toolpath";
import { dedupe } from "@/Toolpath/lib/getAxisLimits";
import {
  AxisLimits,
  HmcAxis,
  ProgramLimits,
  ProgramStats
} from "@/types";

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

  // getAxisLimits(axis: HmcAxis): AxisLimits {
  //   const getAxisValue = path(`values.${axis}`);
  //   const axisValueMap = map(getAxisValue);
  //   const onlyNumbers = filter(Boolean);
  //   const getUniqAxisValues = flow([onlyNumbers, dedupe, axisValueMap]);

  //   const axisValues = getUniqAxisValues(this.blocks);

  //   return {
  //     axis,
  //     min: min(axisValues) as number,
  //     max: max(axisValues) as number
  //   };
  // }

  getLimits(): ProgramLimits {
    const X = this.blocks.map(block => block.X).toArray();

    // this.blocks.forEach(block => console.log(block));

    return { X };
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
