import { EventEmitter } from "eventemitter3";
import { Tokenizr } from "ts-tokenizr";

import { tokenizr } from "@/lib";
import { NcLexerConfig, ValueToken } from "@/types";

export class NcLexer extends EventEmitter {
  static readonly defaults = {
    debug: false,
    tokens: {
      NEWLINE: false,
      EOF: false
    }
  };

  config: NcLexerConfig;

  private readonly lexer: Tokenizr;

  constructor(config?: Partial<NcLexerConfig>) {
    super();
    this.lexer = tokenizr;
    this.config = { ...NcLexer.defaults, ...config };
  }

  /**
   * Sugar method for creating an array from
   * the tokenize generator method.
   */
  tokens(input: string): Array<ValueToken> {
    return Array.from(this.tokenize(input));
  }

  /**
   * @emits token NcToken
   */
  *tokenize(input: string): Generator<ValueToken> {
    let token: ValueToken | null;

    this.lexer.debug(this.config.debug);
    this.lexer.input(input);

    while ((token = this.getNextToken()) !== null) {
      if (token.isA("NEWLINE") && this.config.tokens.NEWLINE === false)
        continue;

      if (token.isA("EOF") && this.config.tokens.EOF === false)
        continue;

      this.emit("token", token);

      yield token;
    }
  }

  private getNextToken(): ValueToken | null {
    const token = this.lexer.token();

    if (token !== null) {
      return token;
    }

    return null;
  }
}
