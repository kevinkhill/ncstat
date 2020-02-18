"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._filterByPrefix = _filterByPrefix;
exports.filterByPrefix = void 0;

var _fp = require("lodash/fp");

function _filterByPrefix(prefix, tokens) {
  return (0, _fp.filter)(token => {
    var _token$value;

    return (
      ((_token$value = token.value) === null || _token$value === void 0
        ? void 0
        : _token$value.prefix) === prefix
    );
  }, tokens);
}

const filterByPrefix = (0, _fp.curry)(_filterByPrefix);
exports.filterByPrefix = filterByPrefix;
