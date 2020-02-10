import { NcToken } from ".";
import { lexer } from "./lexer";

export function tokenizeNc(input: string, debug = false): NcToken[] {
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
