"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcBlock = exports.isEmptyBlock = void 0;

var _fp = require("lodash/fp");

var _lib = require("@/lib");

var _NcLexer = require("@/NcLexer");

var _NcProgram = require("@/NcProgram");

var _NcSpec = require("@/NcSpec");

var _types = require("@/types");

const isEmptyBlock = (0, _fp.prop)("isEmpty");
exports.isEmptyBlock = isEmptyBlock;

class NcBlock {
  static create(tokens) {
    return new NcBlock(tokens);
  }

  constructor(tokens) {
    this.tokens = [];
    this.sourceLine = void 0;
    this.tokens = tokens; // Here we account for "%" being "line #0"

    this.sourceLine = this.tokens[0].line - 1;
  }

  toString(
    options = {
      includeNewlines: false
    }
  ) {
    if (options.includeNewlines) {
      return this.stringTokens.join(" ");
    }

    this.stringTokens.pop();
    return this.stringTokens.join(" ");
  } // $tag(tag: string): Tags {
  //   return this.tags.add(tag);
  // }
  // $unTag(tag: string): boolean {
  //   return this.tags.delete(tag);
  // }
  // $tagged(tag: string): boolean {
  //   return this.tags.has(tag);
  // }

  $has(prefix) {
    // console.log("has", this.tokens);
    return (
      this.tokens.filter(token => token.prefix === prefix).length > 0
    ); // return filterByPrefix(prefix, this.tokens).length > 0;
  }

  $value(prefix) {
    const token = (0, _NcLexer.findByPrefix)(prefix, this.tokens);

    if (token) {
      return token.value;
    }

    return undefined;
  }

  getModalByGroup(group) {
    (0, _lib.isValidModalGroup)(group);
    const result = (0, _fp.intersection)(
      this.gCodes,
      (0, _NcSpec.gCodeStrings)(group)
    );

    if (result.length > 0) {
      return result[0];
    }

    return undefined;
  }

  get gCodes() {
    return (0, _NcLexer.filterByPrefix)("G", this.tokens).map(token =>
      (0, _lib.zeroPadAddress)(token.text)
    );
  }

  get modals() {
    const groups = Object.keys(_NcSpec.G_CODE); // @TODO look into this

    return groups.reduce((accum, group) => {
      (0, _lib.isValidModalGroup)(group);
      const modal = this.getModalByGroup(group);

      if (modal) {
        // eslint-disable-next-line no-param-reassign
        accum = Object.assign(accum, {
          [group]: modal
        });
      }

      return accum;
    }, {});
  }

  get stringTokens() {
    return this.tokens.map(token => token.text);
  }

  get length() {
    return this.tokens.length;
  }

  get position() {
    // @TODO use a constant from somewhere for this
    const axes = ["X", "Y", "Z", "B"];
    const position = {};
    return axes.reduce((accum, axis) => {
      if (this.$has(axis)) {
        accum[axis] = this.$value(axis);
      }

      return accum;
    }, position);
  }

  get tokenCount() {
    return this.tokens.length;
  }

  get hasComment() {
    return (
      this.tokens.find(token => token.isA(_types.Tokens.COMMENT)) !==
      undefined
    );
  } // get isCommentBlock(): boolean {
  //   return (
  //     this.tokens[0]?.type === Tokens.COMMENT &&
  //     this.tokens[1]?.type === Tokens.NEWLINE
  //   );
  // }

  get isEmpty() {
    const tokenIsNewline = this.tokens[0].isA(_types.Tokens.NEWLINE);
    return this.tokens.length === 1 && tokenIsNewline;
  }

  get isCommentBlock() {
    return (
      this.tokens.length === 1 &&
      this.tokens[0].isA(_types.Tokens.COMMENT)
    );
  }

  get comment() {
    const token = (0, _NcLexer.findByType)(
      _types.Tokens.COMMENT,
      this.tokens
    );

    if (token === null || token === void 0 ? void 0 : token.value) {
      return (0, _lib.unwrap)(token.value);
    }

    return undefined;
  }

  get hasToolCall() {
    return this.$has("T");
  } // @TODO configurable toolchange codes

  get hasToolChange() {
    return this.M === 6;
  }

  get hasMovement() {
    // @TODO Manage this conflict with G code groups
    if (
      (0, _fp.intersection)(["G04", "G10", "G65"], this.gCodes).length >
      0
    ) {
      return false;
    }

    if (
      (0, _fp.intersection)(
        _NcProgram.CannedCycle.START_CODES,
        this.gCodes
      ).length > 0
    ) {
      return false;
    }

    return (
      typeof this.B !== "undefined" ||
      typeof this.X !== "undefined" ||
      typeof this.Y !== "undefined" ||
      typeof this.Z !== "undefined"
    );
  }

  get retractCommand() {
    return this.getModalByGroup("GROUP_10");
  }

  get workOffset() {
    return this.getModalByGroup("GROUP_12");
  }

  get cannedCycleStartCode() {
    return (0, _fp.intersection)(
      _NcProgram.CannedCycle.START_CODES,
      this.stringTokens
    )[0];
  }

  get isNline() {
    return this.$has("N");
  }

  get isStartOfCannedCycle() {
    return Boolean(this.cannedCycleStartCode);
  }

  get skipLevel() {
    const token = (0, _NcLexer.findByType)(
      _types.Tokens.BLK_SKIP,
      this.tokens
    );

    if (token) {
      return token.value;
    }

    return undefined;
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
    return (0, _NcLexer.filterByPrefix)("G", this.tokens).map(
      token => token.value
    );
  } // get G(): NcToken[] {
  //   return filterByPrefix("G", this.tokens);
  // }

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
NcBlock.test = {
  isEmptyBlock: (0, _fp.prop)("isEmpty")
};
