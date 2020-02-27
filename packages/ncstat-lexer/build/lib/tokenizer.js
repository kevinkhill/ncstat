"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenizer = void 0;

var _tokenizr = _interopRequireDefault(require("tokenizr"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const tokenizer = new _tokenizr.default(); // Match "%", required for proper NC files

exports.tokenizer = tokenizer;
tokenizer.rule(/%/, ctx => ctx.accept("PRG_DELIM")); // Match "["

tokenizer.rule(/\[/, ctx => ctx.accept("OPEN_BRACKET")); // Match "]"

tokenizer.rule(/\]/, ctx => ctx.accept("CLOSE_BRACKET")); // Match "\n" at end of a line

tokenizer.rule(/\n/, ctx => ctx.accept("NEWLINE")); // Match "O1234", "O12345", ":1234"

tokenizer.rule(/(?:O|:)(\d{4,5})/, (ctx, match) => {
  ctx.accept("PRG_NUMBER", parseInt(match[1]));
}); // Match "A1", "B2.0", "X41.2142"

tokenizer.rule(/([A-NP-Z])([#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
  ctx.accept("ADDR", {
    prefix: match[1],
    value: parseFloat(match[2])
  });
}); // Match "/", "/3"

tokenizer.rule(/\/([0-9]?)/, (ctx, match) => {
  ctx.accept("BLK_SKIP", parseInt(match[1]));
}); // Match comment text "(note)", "( comment )"

tokenizer.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
}); // Ignore " " and "<tab>"

tokenizer.rule(/[ \t]+/, ctx => ctx.ignore()); // tokenizer.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
