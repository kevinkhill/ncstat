"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcLexer = void 0;

var _eventemitter = require("eventemitter3");

var _lib = require("./lib");

class NcLexer extends _eventemitter.EventEmitter {
  constructor(config) {
    super();
    this.defaults = {
      debug: false,
      tokens: {
        NEWLINE: false,
        EOF: false
      }
    };
    this.config = void 0;
    this.tokenizer = _lib.tokenizer;
    this.config = { ...this.defaults, ...config };
  }

  getTokenizer() {
    return this.tokenizer;
  }
  /**
   *
   * @emits token NcToken
   */

  *tokenize(input) {
    let token;
    this.tokenizer.debug(this.config.debug);
    this.tokenizer.input(input);

    while ((token = this.getNextToken()) !== null) {
      if (token.isA("NEWLINE") && this.config.tokens.NEWLINE === false)
        continue;
      if (token.isA("EOF") && this.config.tokens.EOF === false)
        continue;
      this.emit("token", token);
      yield token;
    }
  }
  /**
   * Sugar method for creating an array from
   * the tokenize generator method.
   */

  tokens(input) {
    return Array.from(this.tokenize(input));
  }

  getNextToken() {
    const token = this.tokenizer.token();

    if (token !== null) {
      return token;
    }

    return null;
  }
}

exports.NcLexer = NcLexer;
