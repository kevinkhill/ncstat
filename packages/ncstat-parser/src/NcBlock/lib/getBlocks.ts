import { NcToken } from "@/NcLexer";

import { NcBlock } from "../NcBlock";

export function getBlocks(
  tokens: Array<NcToken> | Generator<NcToken>
): Array<NcBlock> {
  const blocks: Array<NcBlock> = [];

  let line: Array<NcToken> = [];

  for (const token of tokens) {
    if (token.type === "NEWLINE") {
      blocks.push(new NcBlock(line));

      line = [];
    } else {
      line.push(token);
    }
  }

  return blocks;
}
