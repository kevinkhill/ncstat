// eslint-disable-next-line lodash-fp/use-fp
import { isEqual, last, reduce } from "lodash";
import { reject } from "lodash/fp";

// import { isEqual } from "lodash/fp";
import { NcToken, NcTokens, tokenizeNc } from "../NcLexer";
import { NcBlock } from "./NcBlock";

export function parseLine(input: string): NcBlock {
  const tokens = reject(["type", "NEWLINE"], tokenizeNc(input));

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
