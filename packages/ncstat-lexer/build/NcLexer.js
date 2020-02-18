"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcLexer = void 0;

var _lexer = require("./lexer");

class NcLexer {
  constructor({ debug }) {
    this.debug = void 0;
    this.lexer = _lexer.lexer;
    this.debug = Boolean(debug);
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
