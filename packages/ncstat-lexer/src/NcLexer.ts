import { EventEmitter } from "eventemitter3";
import Tokenizr from "tokenizr";

import { tokenizer } from "./lib";
import { NcToken } from "./NcToken";
import { LexerConfig } from "./types";

export class NcLexer extends EventEmitter {
  defaults = {
    debug: false,
    newlines: true
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
  *tokenize(input: string): Generator<NcToken> {
    this.tokenizer.debug(this.config.debug);
    this.tokenizer.input(input);

    let token;

    while ((token = this.tokenizer.token()) !== null) {
      if (token.type === "NEWLINE" && this.config.newlines === false)
        continue;

      this.emit("token", token);

      yield new NcToken(token);
    }
  }

  tokenArray(input: string): Array<NcToken> {
    return Array.from(this.tokenize(input));
  }
}
