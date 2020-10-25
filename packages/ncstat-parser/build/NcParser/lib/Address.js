"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Address = void 0;

var _NcLexer = require("@/NcLexer");

var _NcSpec = require("@/NcSpec");

var _types = require("@/types");

var _ = require(".");

class Address {
  static fromString(address) {
    const { prefix, value } = (0, _.splitParse)(address);
    return new Address(prefix, value);
  }

  static fromToken(token) {
    if (token.type !== _types.Tokens.ADDRESS) {
      throw Error(`Token must be of type "ADDR"`);
    }

    (0, _NcLexer.assertIsAddressToken)(token);
    return new Address(token.prefix, token.value);
  }

  constructor(prefix, value) {
    this.prefix = void 0;
    this.value = void 0;
    this.value = value;
    this.prefix = prefix;
  }

  get definition() {
    return (0, _NcSpec.getDefinition)(this);
  }

  get isGcode() {
    return this.prefix === "G";
  }

  get isMcode() {
    return this.prefix === "M";
  }

  get isZero() {
    return this.value === 0;
  }

  get isPositive() {
    return this.value > 0;
  }

  get isNegative() {
    return this.value < 0;
  }

  toString() {
    return `${this.prefix}${this.value}`;
  }
}

exports.Address = Address;
