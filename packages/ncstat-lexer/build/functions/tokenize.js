"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenize = tokenize;

var _NcLexer = require("../NcLexer");

/**
 * Tokenize a string with the standard NcLexer
 *
 * This function creates an instance of the
 * NcLexer and processes the string for tokens
 * with the default settings
 *
 * @example ```
 * const tokens = tokenize("G91 G28 Z0.");
 *
 * console.log(tokens.length); // 3
 * ```
 */
function tokenize(input) {
  const lexer = new _NcLexer.NcLexer();
  return lexer.tokens(input);
}
