import { filter } from "lodash/fp";

// import { isEqual } from "lodash/fp";
import { NcToken, NcTokens, tokenizeNc } from "../NcLexer";
import { NcBlock } from "./NcBlock";

export function parseLine(input: string): NcBlock {
  const tokens = filter(token => {
    return token.type !== "NEWLINE" && token.type !== "EOF";
  }, tokenizeNc(input));

  return new NcBlock(tokens);
}

export function getBlocks(tokens: NcTokens): NcBlock[] {
  const blocks: NcBlock[] = [];

  let line: NcToken[] = [];

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
