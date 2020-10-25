"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenizr = void 0;

var _tsTokenizr = require("ts-tokenizr");

var _tokens = require("@/types/tokens");

const tokenizr = new _tsTokenizr.Tokenizr(); // Match "%", required for proper NC files

exports.tokenizr = tokenizr;
tokenizr.rule(/%/, ctx => ctx.accept(_tokens.Tokens.PRG_DELIM)); // Match "["

tokenizr.rule(/\[/, ctx => ctx.accept(_tokens.Tokens.BRACKET_OPEN)); // Match "]"

tokenizr.rule(/\]/, ctx => ctx.accept(_tokens.Tokens.BRACKET_CLOSE)); // Match "\n" at end of a line

tokenizr.rule(/\n/, ctx => ctx.accept(_tokens.Tokens.NEWLINE)); // Match "O1234", "O12345", ":1234"

tokenizr.rule(/(O|:)(\d{4,5})/, (ctx, match) => {
  ctx.accept(_tokens.Tokens.PRG_NUMBER, {
    prefix: "O",
    value: parseInt(match[2])
  });
}); // Match "A1", "B2.0", "X41.2142"

tokenizr.rule(/([A-NP-Z])([#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
  ctx.accept(_tokens.Tokens.ADDRESS, {
    prefix: match[1],
    value: parseFloat(match[2])
  });
}); // Match "/", "/3"

tokenizr.rule(/\/([0-9]?)/, (ctx, match) => {
  ctx.accept(_tokens.Tokens.BLK_SKIP, parseInt(match[1]));
}); // Match comment text "(note)", "( comment )"

tokenizr.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept(_tokens.Tokens.COMMENT, match[1]);
}); // Ignore " ", "<TAB>", "<CR>"

tokenizr.rule(/[ \t\r]+/, ctx => ctx.ignore()); // tokenizr.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
