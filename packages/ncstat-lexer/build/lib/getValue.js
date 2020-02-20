"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;

/**
 * @TODO Class this?
 */
function getValue(token) {
  return {
    value: token.value.value,
    prefix: token.value.prefix
  };
}
