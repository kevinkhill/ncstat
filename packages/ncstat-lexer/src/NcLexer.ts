import { EventEmitter } from "eventemitter3";

import { tokenizer } from "./lib";
import { LexerConfig, NcToken } from "./types";

export class NcLexer extends EventEmitter {
  defaults = {
    debug: false,
    newlineTokens: true
  };

  config: LexerConfig;

  private tokenizer = tokenizer;

  constructor(config?: Partial<LexerConfig>) {
    super();
    this.config = Object.assign(this.defaults, config);
  }

  *tokenize(input: string): Generator<NcToken> {
    this.tokenizer.debug(this.config.debug);
    this.tokenizer.input(input);

    let token;

    while ((token = this.tokenizer.token()) !== null) {
      if (
        token.type === "NEWLINE" &&
        this.config.newlineTokens === false
      )
        continue;

      this.emit("token", token);

      yield token;
    }
  }

  tokenArray(input: string): Array<NcToken> {
    return Array.from(this.tokenize(input));
  }
}
