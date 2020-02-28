import { EventEmitter } from "eventemitter3";
import Tokenizr from "tokenizr";

import { tokenizer } from "./lib";
import { LexerConfig, ValueToken } from "./types";

export class NcLexer extends EventEmitter {
  defaults = {
    debug: false,
    tokens: {
      NEWLINE: false,
      EOF: false
    }
  };

  config: LexerConfig;

  private tokenizer = tokenizer;

  constructor(config?: Partial<LexerConfig>) {
    super();

    this.config = { ...this.defaults, ...config };
  }

  getTokenizer(): Tokenizr {
    return this.tokenizer;
  }

  /**
   *
   * @emits token NcToken
   */
  *tokenize(input: string): Generator<ValueToken> {
    let token: ValueToken | null;

    this.tokenizer.debug(this.config.debug);
    this.tokenizer.input(input);

    while ((token = this.getNextToken()) !== null) {
      if (this.config.tokens[token.type] === false) continue;

      if (token.isA("NEWLINE") && this.config.newlines === false)
        continue;

      if (token.isA("EOF") && this.config.tokens.eof === false)
        continue;

      this.emit("token", token);

      yield token;
    }
  }

  /**
   * Sugar method for creating an array from
   * the tokenize generator method.
   */
  tokens(input: string): Array<ValueToken> {
    return Array.from(this.tokenize(input));
  }

  private getNextToken(): ValueToken | null {
    const token = this.tokenizer.token();

    if (token !== null) {
      return token as ValueToken;
    }

    return null;
  }
}
