import { lexer } from "./lexer";

export function getTokens(input: string, debug = false): any {
  lexer.debug(debug);
  lexer.input(input);

  return lexer.tokens();
}
