"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlockGenerator = getBlockGenerator;

var _NcBlock = require("./NcBlock");

function* getBlockGenerator(tokens) {
  let lineTokens = [];

  for (const token of tokens) {
    if (token.type === "NEWLINE") {
      yield new _NcBlock.NcBlock(lineTokens);
      lineTokens = [];
    } else {
      lineTokens.push(token);
    }
  }
}
