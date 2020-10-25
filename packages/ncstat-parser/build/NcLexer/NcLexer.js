"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcLexer = void 0;

var _eventemitter = require("eventemitter3");

var _lib = require("@/lib");

var _NcLexer = require("@/NcLexer");

const debug = (0, _lib.makeDebugger)("lexer");

class NcLexer extends _eventemitter.EventEmitter {
  constructor(config) {
    super();
    this.config = void 0;
    this.tokenizr = void 0;
    this.tokenizr = _NcLexer.tokenizr;
    this.config = { ...NcLexer.defaults, ...config };
    debug("Config: %o", this.config);
  }
  /**
   * Sugar method for creating an array from
   * the tokenize generator method.
   */

  tokens(input) {
    return Array.from(this.tokenize(input));
  }
  /**
   * @emits token NcToken
   */

  *tokenize(input) {
    let token;
    this.tokenizr.debug(this.config.debug);
    this.tokenizr.input(input); // debug("Tokenizing input");

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
   * Wrap the generic Tokenizr token
   *
   * This is mostly to unpack token.value.value and token.value.prefix
   * onto the token itself.
   *
   * @TODO More methods on the token?
   */

  getNextToken() {
    const token = this.tokenizr.token();
    return token ? _NcLexer.NcToken.from(token) : null;
  }
}

exports.NcLexer = NcLexer;
NcLexer.defaults = {
  debug: false,
  tokens: {
    NEWLINE: true,
    EOF: false
  }
};
