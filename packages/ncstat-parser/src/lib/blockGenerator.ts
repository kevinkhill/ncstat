import { NcBlock } from "@/NcBlock";
import type { NcToken } from "@/types";

export function* getBlockGenerator(
  tokens: Array<NcToken> | Generator<NcToken>
): Generator<NcBlock> {
  let lineTokens: Array<NcToken> = [];

  for (const token of tokens) {
    if (token.type === "NEWLINE") {
      yield new NcBlock(lineTokens);

      lineTokens = [];
    } else {
      lineTokens.push(token);
    }
  }
}

export function getBlockArray(
  tokens: Array<NcToken> | Generator<NcToken>
): Array<NcBlock> {
  const blocks: Array<NcBlock> = [];
  let blockTokens: Array<NcToken> = [];

  for (const token of tokens) {
    if (token.type !== "NEWLINE") {
      console.log(token);
      blockTokens.push(token);
    } else {
      blocks.push(new NcBlock(blockTokens));

      blockTokens = [];
    }
  }

  return blocks;
}
