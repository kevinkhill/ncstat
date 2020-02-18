"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlocks = getBlocks;

var _NcBlock = require("./NcBlock");

// import { isEqual } from "lodash/fp";
function getBlocks(tokens) {
  const blocks = [];
  let line = [];

  for (const token of tokens) {
    if (token.type === "NEWLINE") {
      blocks.push(new _NcBlock.NcBlock(line));
      line = [];
    } else {
      line.push(token);
    }
  }

  return blocks;
}
