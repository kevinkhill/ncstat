import { NcToken } from "@/NcLexer";

import { NcBlock } from "../NcBlock";

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
