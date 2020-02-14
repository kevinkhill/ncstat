import { lexer } from "./lexer";
import { NcTokens } from "./types";

export class NcLexer {
  debug: boolean;

  private lexer = lexer;

  constructor({ debug }: { debug?: boolean }) {
    this.debug = Boolean(debug);
  }

  *tokenize(input: string): NcTokens {
    this.lexer.debug(this.debug);
    this.lexer.input(input);

    let token;

    while ((token = this.lexer.token()) !== null) {
      yield token;
    }
  }
}
