import { Tokenizr } from "ts-tokenizr";

export const tokenizr = new Tokenizr();

// Match "%", required for proper NC files
tokenizr.rule(/%/, ctx => ctx.accept("PRG_DELIM"));

// Match "["
tokenizr.rule(/\[/, ctx => ctx.accept("OPEN_BRACKET"));

// Match "]"
tokenizr.rule(/\]/, ctx => ctx.accept("CLOSE_BRACKET"));

// Match "\n" at end of a line
tokenizr.rule(/\n/, ctx => ctx.accept("NEWLINE"));

// Match "O1234", "O12345", ":1234"
tokenizr.rule(/(?:O|:)(\d{4,5})/, (ctx, match) => {
  ctx.accept("PRG_NUMBER", parseInt(match[1]));
});

// Match "A1", "B2.0", "X41.2142"
tokenizr.rule(/([A-NP-Z])([#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
  ctx.accept("ADDR", {
    prefix: match[1],
    value: parseFloat(match[2])
  });
});

// Match "/", "/3"
tokenizr.rule(/\/([0-9]?)/, (ctx, match) => {
  ctx.accept("BLK_SKIP", parseInt(match[1]));
});

// Match comment text "(note)", "( comment )"
tokenizr.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
});

// Ignore " ", <TAB>, <CR>
tokenizr.rule(/[ \t\r]+/, ctx => ctx.ignore());

// tokenizr.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
