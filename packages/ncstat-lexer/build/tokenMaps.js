"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addressValue = addressValue;

function addressValue(token) {
  if (token.type === "ADDR") {
    return token.value.value;
  }

  return NaN;
}
