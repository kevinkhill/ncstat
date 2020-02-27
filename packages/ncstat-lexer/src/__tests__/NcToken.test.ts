import { NcLexer } from "../NcLexer";

const lexer = new NcLexer();

describe("Creating NcTokens", () => {
  const tokens = lexer.tokenArray("G0 G90 G54");

  expect(tokens).toHaveLength(4);
});
