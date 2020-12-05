import { Tokenizr } from "ts-tokenizr";

import { Tokens } from "../../types/tokens";

export const tokenizr = new Tokenizr();

// Match "%", required for proper NC files
tokenizr.rule(/%/, (ctx) => ctx.accept(Tokens.PRG_DELIM));

// Match "["
tokenizr.rule(/\[/, (ctx) => ctx.accept(Tokens.BRACKET_OPEN));

// Match "]"
tokenizr.rule(/\]/, (ctx) => ctx.accept(Tokens.BRACKET_CLOSE));

// Match "\n" at end of a line
tokenizr.rule(/\n/, (ctx) => ctx.accept(Tokens.NEWLINE));

// Match "O1234", "O12345", ":1234"
tokenizr.rule(/(O|:)(\d{4,5})/, (ctx, match) => {
  ctx.accept(Tokens.PRG_NUMBER, {
    prefix: "O",
    value: parseInt(match[2])
  });
});

// Match "M5", "M01"
tokenizr.rule(/M([\d]+)/, (ctx, match) => {
  ctx.accept(Tokens.M_CODE, {
    prefix: "M",
    value: parseInt(match[1])
  });
});

// Match "A1", "B2.0", "X41.2142"
tokenizr.rule(/([A-LNP-Z])([#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
  ctx.accept(Tokens.ADDRESS, {
    prefix: match[1],
    value: parseFloat(match[2])
  });
});

// Match "/", "/3"
tokenizr.rule(/\/([0-9]?)/, (ctx, match) => {
  ctx.accept(Tokens.BLK_SKIP, parseInt(match[1]));
});

// Match comment text "(note)", "( comment )"
tokenizr.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept(Tokens.COMMENT, match[1]);
});

// Ignore " ", "<TAB>", "<CR>"
tokenizr.rule(/[ \t\r]+/, (ctx) => ctx.ignore());

// tokenizr.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
