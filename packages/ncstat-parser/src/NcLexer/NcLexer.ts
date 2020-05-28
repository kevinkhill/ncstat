import { EventEmitter } from "eventemitter3";
import { Token, Tokenizr } from "ts-tokenizr";

import { NcToken } from "@/NcLexer";
import { tokenizr } from "@/NcLexer";
import { NcLexerConfig } from "@/types";

export class NcLexer extends EventEmitter {
  static readonly defaults = {
    debug: false,
    tokens: {
      NEWLINE: true,
      EOF: false
    }
  };

  config: NcLexerConfig;

  private readonly tokenizr: Tokenizr;

  constructor(config?: Partial<NcLexerConfig>) {
    super();
    this.tokenizr = tokenizr;
    this.config = { ...NcLexer.defaults, ...config };
  }

  /**
   * Sugar method for creating an array from
   * the tokenize generator method.
   */
  tokens(input: string): Array<Token> {
    return Array.from(this.tokenize(input));
  }

  /**
   * @emits token NcToken
   */
  *tokenize(input: string): Generator<Token> {
    let token: Token | null;

    this.tokenizr.debug(this.config.debug);
    this.tokenizr.input(input);

    while ((token = this.getNextToken()) !== null) {
      if (token.isA("NEWLINE") && this.config.tokens.NEWLINE === false)
        continue;

      if (token.isA("EOF") && this.config.tokens.EOF === false)
        continue;

      this.emit("token", token);

      yield token;
    }
  }

  private getNextToken(): Token | null {
    return this.tokenizr.token();
  }

  /**
   * Wrap the generic Tokenizr token
   */
  // private getNextToken(): Token | null {
  //   const token = this.tokenizr.token();

  //   if (token) {
  //     return NcToken.from(token);
  //   }

  //   return null;
  // }
}
