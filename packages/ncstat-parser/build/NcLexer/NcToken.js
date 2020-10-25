"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcToken = void 0;

var _lib = require("@/lib");

var _types = require("@/types");

const debug = (0, _lib.makeDebugger)("lexer:token");

class NcToken {
  static from(token) {
    return new NcToken(token);
  }

  constructor(token) {
    this.type = void 0;
    this.text = void 0;
    this.pos = void 0;
    this.line = void 0;
    this.column = void 0;
    this.value = void 0;
    this.prefix = void 0;
    this.type = token.type;
    this.value = token.value;
    this.text = token.text;
    this.pos = token.pos;
    this.line = token.line;
    this.column = token.column;

    if (
      token.type === _types.Tokens.ADDRESS ||
      token.type === _types.Tokens.PRG_NUMBER
    ) {
      const value = token.value;
      this.prefix = value.prefix;
      this.value = parseFloat(value.value);
    }

    debug("%s %o", this.type, this.text);
  }

  toString() {
    const tokenAttr = [
      `type: ${this.type}`,
      `value: ${JSON.stringify(this.value)}`,
      `text: ${JSON.stringify(this.text)}`,
      `pos: ${this.pos}`,
      `line: ${this.line}`,
      `column: ${this.column}`
    ].join(", ");
    return `<${tokenAttr}>`;
  }

  isA(type, prefix) {
    if (type !== this.type) {
      return false;
    }

    if (prefix && prefix !== this.value) {
      return false;
    }

    return true;
  }
}

exports.NcToken = NcToken;
