import { lexer } from "./lib/lexer";
import { NcTokens, LexerConfig } from "./types";

export class NcLexer {
  debug: boolean;

  private lexer = lexer;

  constructor({ debug = false }: Partial<LexerConfig>) {
    this.debug = debug;
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
