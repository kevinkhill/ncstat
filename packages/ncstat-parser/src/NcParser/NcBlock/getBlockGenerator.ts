import { NcToken } from "@/NcLexer";

import { NcBlock, Tokens } from "./NcBlock";

export function* getBlockGenerator(tokens: Tokens): Generator<NcBlock> {
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

export function getBlockArray(tokens: Tokens): Array<NcBlock> {
  return Array.from(getBlockGenerator(tokens));
}
