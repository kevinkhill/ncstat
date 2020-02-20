"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefixFilter = prefixFilter;

var _fp = require("lodash/fp");

function prefixFilter(prefix, tokens) {
  return (0, _fp.filter)(token => {
    var _token$value;

    return (
      ((_token$value = token.value) === null || _token$value === void 0
        ? void 0
        : _token$value.prefix) === prefix
    );
  }, tokens);
}
