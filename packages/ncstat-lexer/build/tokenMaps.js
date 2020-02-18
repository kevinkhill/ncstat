"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressValue = addressValue;
exports.textMap = void 0;

var _fp = require("lodash/fp");

function addressValue(token) {
  if (token.type === "ADDR") {
    return token.value.value;
  }

  return NaN;
}

const textMap = (0, _fp.map)("text");
exports.textMap = textMap;
