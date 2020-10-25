"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mcode = void 0;

var _lib = require("@/lib");

var _Address = require("./Address");

const debug = (0, _lib.makeDebugger)("parser:m-code");

class Mcode extends _Address.Address {
  constructor(value) {
    super("M", value);
    this.prefix = "M";
    debug("%o", this.definition.desc);
  }

  get isPause() {
    return this.value === 0;
  }

  get isOpStop() {
    return this.value === 1;
  }

  get isEndOfProgram() {
    return this.value === 30;
  }
}

exports.Mcode = Mcode;
