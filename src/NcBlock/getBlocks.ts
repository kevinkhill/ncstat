// import { filter } from "lodash/fp";

// import { isEqual } from "lodash/fp";
import { NcToken, NcTokens } from "../NcLexer";
import { NcBlock } from "./NcBlock";

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
