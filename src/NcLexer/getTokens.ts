import { IToken } from "tokenizr";

import { lexer } from "./lexer";

export type NcToken = IToken<any>;
export type LexerInput = string | string[] | Buffer;

export function getTokens(input: string, debug = false): NcToken[] {
  lexer.debug(debug);
  lexer.input(input);

  return lexer.tokens();
}

export function* getTokenGenerator(
  input: string,
  debug = false
): Generator<NcToken> {
  lexer.debug(debug);
  lexer.input(input);

  let token;
  while ((token = lexer.token()) !== null) yield token;
}
