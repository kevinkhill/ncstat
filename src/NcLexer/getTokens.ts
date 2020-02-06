import { IToken } from "tokenizr";

import { lexer } from "./lexer";

export type NcToken = IToken<any>;
export type LexerInput = string | string[] | Buffer;

export function getTokens(input: string, debug = false): NcToken[] {
  lexer.debug(debug);
  lexer.input(input);

  return lexer.tokens();
}
