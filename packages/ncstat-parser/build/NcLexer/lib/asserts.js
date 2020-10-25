"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertIsAddressToken = assertIsAddressToken;
exports.assertIsNumericToken = assertIsNumericToken;

var _types = require("@/types");

/* eslint-disable @typescript-eslint/no-explicit-any */
function isNumeric(arg) {
  return !isNaN(parseFloat(arg)) && isFinite(arg);
}

function assertIsAddressToken(token) {
  if (token.type !== _types.Tokens.ADDRESS) {
    throw Error("assertIsAddressToken");
  }
}

function assertIsNumericToken(token) {
  if (!isNumeric(token.value)) {
    throw Error("assertIsNumericToken");
  }
}
