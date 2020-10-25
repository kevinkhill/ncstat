"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockGenerator = blockGenerator;

var _types = require("@/types");

var _NcBlock = require("./NcBlock");

function* blockGenerator(tokens) {
  let lineTokens = [];

  for (const token of tokens) {
    if (token.type === _types.Tokens.NEWLINE) {
      yield new _NcBlock.NcBlock(lineTokens);
      lineTokens = [];
    } else {
      lineTokens.push(token);
    }
  }
}
