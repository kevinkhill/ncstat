"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcLexer = void 0;

var _lexer = require("./lib/lexer");

class NcLexer {
  constructor({ debug = false }) {
    this.debug = void 0;
    this.lexer = _lexer.lexer;
    this.debug = debug;
  }

  *tokenize(input) {
    this.lexer.debug(this.debug);
    this.lexer.input(input);
    let token;

    while ((token = this.lexer.token()) !== null) {
      yield token;
    }
  }
}

exports.NcLexer = NcLexer;
