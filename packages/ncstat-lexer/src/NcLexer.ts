import { EventEmitter } from "eventemitter3";

import { isType, lexer } from "./lib";
import { LexerConfig, NcToken } from "./types";

export class NcLexer extends EventEmitter {
  debug: boolean;
  newlineTokens: boolean;

  private lexer = lexer;

  constructor(
    config: Partial<LexerConfig> = { debug: false, newlineTokens: true }
  ) {
    super();

    this.debug = Boolean(config.debug);
    this.newlineTokens = Boolean(config.newlineTokens);
  }

  *tokenize(input: string): Generator<NcToken> {
    this.lexer.debug(this.debug);
    this.lexer.input(input);

    let token;

    while ((token = this.lexer.token()) !== null) {
      if (isType("NEWLINE", token) && this.newlineTokens === false)
        continue;

      yield token;

      this.emit("token", token);
    }
  }

  tokenArray(input: string): Array<NcToken> {
    return Array.from(this.tokenize(input));
  }
}
