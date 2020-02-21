"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcLexer = void 0;

var _eventemitter = require("eventemitter3");

var _lib = require("./lib");

class NcLexer extends _eventemitter.EventEmitter {
  constructor(
    config = {
      debug: false,
      newlineTokens: true
    }
  ) {
    super();
    this.debug = void 0;
    this.newlineTokens = void 0;
    this.lexer = _lib.lexer;
    this.debug = Boolean(config.debug);
    this.newlineTokens = Boolean(config.newlineTokens);
  }

  *tokenize(input) {
    this.lexer.debug(this.debug);
    this.lexer.input(input);
    let token;

    while ((token = this.lexer.token()) !== null) {
      if (
        (0, _lib.isType)("NEWLINE", token) &&
        this.newlineTokens === false
      )
        continue;
      yield token;
      this.emit("token", token);
    }
  }

  tokenArray(input) {
    return Array.from(this.tokenize(input));
  }
}

exports.NcLexer = NcLexer;
