import { lexer } from "./lexer";

export function getTokens(
  input: string,
  debug = false
): Generator<any> {
  lexer.debug(debug);
  lexer.input(input);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function* tokens() {
    let token;
    while ((token = lexer.token()) !== null) {
      yield token;
    }
  }

  return tokens();
}
