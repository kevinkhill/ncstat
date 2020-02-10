import { NcToken } from "../NcLexer";
import { NcBlock } from "./NcBlock";

export function* getBlockGenerator(
  tokenGen: Generator<NcToken>
): Generator<NcBlock> {
  let tokens: NcToken[] = [];

  for (const token of tokenGen) {
    if (token.type === "NEWLINE") {
      yield new NcBlock(tokens);

      tokens = [];
    } else {
      tokens.push(token);
    }
  }
}
