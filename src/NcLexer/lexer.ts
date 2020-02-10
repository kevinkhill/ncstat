import Tokenizr from "tokenizr";

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
lexer.rule(/(?:O|:)(\d{4,5})/, (ctx, match) => {
  ctx.accept("PRG_NUMBER", parseInt(match[1]));
});

// Match "A1", "B2.0", "X41.2142"
lexer.rule(/([A-NP-Z])([#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
  ctx.accept("ADDR", {
    prefix: match[1],
    value: parseFloat(match[2])
  });
});

// Match "/", "/3"
lexer.rule(/\/([0-9]?)/, (ctx, match) => {
  ctx.accept("BLK_SKIP", parseInt(match[1]));
});

// Match comment text "(note)", "( comment )"
lexer.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
});

// Ignore " " and "<tab>"
lexer.rule(/[ \t]+/, ctx => ctx.ignore());

// lexer.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
