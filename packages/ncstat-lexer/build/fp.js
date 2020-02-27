"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;

var _tokenizer = require("./lib/tokenizer");

function tokenize(input) {
  return _tokenizer.tokenizer.input(input).tokens();
}
