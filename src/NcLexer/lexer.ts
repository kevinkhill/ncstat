import Tokenizr from "tokenizr";

import { Address, G_CODES, M_CODES } from "../NcCodes";

export const lexer = new Tokenizr();

// Match "%", required for proper NC files
lexer.rule(/%/, ctx => ctx.accept("PRG_DELIM"));

// Match "["
lexer.rule(/\[/, ctx => ctx.accept("OPEN_BRACKET"));

// Match "]"
lexer.rule(/\]/, ctx => ctx.accept("CLOSE_BRACKET"));

// Match "\n" at end of a line
lexer.rule(/\n/, ctx => ctx.accept("NEWLINE"));

// Match "O1234", "O12345", ":1234"
lexer.rule(/(O|:)(\d{4,5})/, ctx => {
  ctx.accept("PRG_NUMBER");
});

// Match "A1", "B2.0", "X41.2142"
lexer.rule(/([A-FH-LNP-Z][#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
  ctx.accept("ADDRESS", Address.parse(match[1]));
});

// Match "G0", "G01", "G54", "G103"
lexer.rule(/(G[0-9]+)/, (ctx, match) => {
  if (G_CODES[match[0]]) {
    ctx.accept("G_CODE", G_CODES[match[0]]);
  } else {
    ctx.accept("G_CODE", Address.parse(match[1]));
  }
});

// Match "M00", "M6", "M107"
lexer.rule(/(M[0-9]+)\.?/, (ctx, match) => {
  if (M_CODES[match[0]]) {
    ctx.accept("M_CODE", M_CODES[match[0]]);
  } else {
    ctx.accept("M_CODE", Address.parse(match[1]));
  }
});

// Match "/", "/3"
lexer.rule(/\/([0-9]?)/, (ctx, match) => {
  ctx.accept("BLKSKP", parseInt(match[1]));
});

// Match comment text "(note)", "( comment )"
lexer.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
});

// Ignore " " and "<tab>"
lexer.rule(/[ \t]+/, ctx => ctx.ignore());

// lexer.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
