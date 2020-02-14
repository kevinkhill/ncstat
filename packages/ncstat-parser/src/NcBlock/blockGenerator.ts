import { NcToken, NcTokens } from "@ncstat/lexer";
import { NcBlock } from "./NcBlock";

export function* getBlockGenerator(
  tokens: NcTokens
): Generator<NcBlock> {
  let lineTokens: NcToken[] = [];

  for (const token of tokens) {
    if (token.type === "NEWLINE") {
      yield new NcBlock(lineTokens);

      lineTokens = [];
    } else {
      lineTokens.push(token);
    }
  }
}
