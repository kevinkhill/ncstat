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
      newlineTokens: true
    };
    this.config = void 0;
    this.tokenizer = _lib.tokenizer;
    this.config = Object.assign(this.defaults, config);
  }

  *tokenize(input) {
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

  tokenArray(input) {
    return Array.from(this.tokenize(input));
  }
}

exports.NcLexer = NcLexer;
