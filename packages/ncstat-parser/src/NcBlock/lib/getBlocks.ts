import { NcTokens } from "@ncstat/lexer";

import { NcBlock } from "../NcBlock";

export function getBlocks(tokens: NcTokens): NcBlock[] {
  const blocks: NcBlock[] = [];

  let line: NcTokens = [];

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
