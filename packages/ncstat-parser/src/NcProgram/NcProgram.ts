// export type NcProgram = Linear<NcBlock>;
import { Linear } from "doublie";
import { Token } from "ts-tokenizr";

import { getBlockGenerator, NcBlock } from "@/NcBlock";
import { Toolpath } from "@/Toolpath";

export class NcProgram {
  blocks: Linear<NcBlock> = new Linear<NcBlock>();
  toolpaths: Array<Toolpath> = [];

  // constructor() {}

  toString(): string {
    return this.blocks.join("\n");
  }

  withBlocks(fn: (block: NcBlock) => void): this {
    this.blocks.forEach(fn);
    return this;
  }

  loadTokens(tokens: Array<Token>): this {
    const blocks = getBlockGenerator(tokens);

    this.blocks.append(...blocks);

    return this;
  }
}
