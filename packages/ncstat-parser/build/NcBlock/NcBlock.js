"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcBlock = void 0;

var _fp = require("lodash/fp");

var _lexer = require("@ncstat/lexer");

var _CannedCycle = require("Toolpath/CannedCycle");

// import { RETRACT_CODES, START_CODES } from "../Toolpath/CannedCycle";
class NcBlock {
  getPosition() {
    return {
      B: this.B,
      X: this.X,
      Y: this.Y,
      Z: this.Z
    };
  }

  static create(tokens) {
    return new NcBlock(tokens);
  }

  constructor(tokens) {
    this.tokens = tokens;
    this.retractCode = void 0;
    this.tokens = tokens;
  }

  $has(prefix) {
    return (0, _lexer.prefixFilter)(prefix, this.tokens).length > 0;
  }

  $value(prefix) {
    if (this.$has(prefix)) {
      const token = (0, _lexer.prefixFilter)(prefix, this.tokens)[0];
      return (0, _lexer.addressValue)(token);
    }

    return NaN;
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  map(iter) {
    return (0, _fp.map)(iter, this.tokens);
  }

  toString() {
    return this.map("text").join(" ");
  }

  get lineNumber() {
    return this.N;
  }

  get hasToolCall() {
    return this.$has("T");
  }

  get hasToolChange() {
    return this.M === 6;
  }

  get hasMovement() {
    if ((0, _fp.intersection)([4, 10, 65], this.G).length > 0) {
      return false;
    }

    return (
      typeof this.B === "number" ||
      typeof this.X === "number" ||
      typeof this.Y === "number" ||
      typeof this.Z === "number"
    );
  }

  get cannedCycleStartCode() {
    return (0, _fp.intersection)(
      _CannedCycle.START_CODES,
      this.map("text")
    )[0];
  }

  get isNline() {
    return this.$has("N");
  }

  get isStartOfCannedCycle() {
    return Boolean(this.cannedCycleStartCode);
  }

  get skipLevel() {
    var _find;

    return (_find = (0, _fp.find)(
      ["type", "BLK_SKIP"],
      this.tokens
    )) === null || _find === void 0
      ? void 0
      : _find.value;
  }

  get comment() {
    var _find2;

    return (_find2 = (0, _fp.find)(
      ["type", "COMMENT"],
      this.tokens
    )) === null || _find2 === void 0
      ? void 0
      : _find2.value;
  }

  get A() {
    return this.$value("A");
  }

  get B() {
    return this.$value("B");
  }

  get C() {
    return this.$value("C");
  }

  get D() {
    return this.$value("D");
  }

  get E() {
    return this.$value("E");
  }

  get F() {
    return this.$value("F");
  }

  get G() {
    return (0, _fp.map)(
      _lexer.addressValue,
      (0, _lexer.prefixFilter)("G", this.tokens)
    );
  }

  get H() {
    return this.$value("H");
  }

  get I() {
    return this.$value("I");
  }

  get J() {
    return this.$value("J");
  }

  get K() {
    return this.$value("K");
  }

  get L() {
    return this.$value("L");
  }

  get M() {
    return this.$value("M");
  }

  get N() {
    return this.$value("N");
  }

  get O() {
    return this.$value("O");
  }

  get P() {
    return this.$value("P");
  }

  get Q() {
    return this.$value("Q");
  }

  get R() {
    return this.$value("R");
  }

  get S() {
    return this.$value("S");
  }

  get T() {
    return this.$value("T");
  }

  get U() {
    return this.$value("U");
  }

  get V() {
    return this.$value("V");
  }

  get W() {
    return this.$value("W");
  }

  get X() {
    return this.$value("X");
  }

  get Y() {
    return this.$value("Y");
  }

  get Z() {
    return this.$value("Z");
  }
}

exports.NcBlock = NcBlock;
