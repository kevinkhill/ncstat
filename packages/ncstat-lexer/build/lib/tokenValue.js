"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenValue = tokenValue;

function tokenValue(token) {
  var _ref, _token$value;

  return (_ref =
    (_token$value = token.value) === null || _token$value === void 0
      ? void 0
      : _token$value.value) !== null && _ref !== void 0
    ? _ref
    : token.value;
}
