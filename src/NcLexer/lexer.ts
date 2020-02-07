import Tokenizr from "tokenizr";

import { G_CODES, gCode } from "./gcodes";
import { M_CODES, ValueAddress } from "./index";
import { mCode } from "./mcodes";

export const lexer = new Tokenizr();

export interface TokenData {
  raw: string;
  desc: string;
  value: number;
  prefix: string;
}

// Match "%", required for proper NC files
lexer.rule(/%/, ctx => ctx.accept("PRG_DELIM"));

// Match "["
// lexer.rule(/\[/, ctx => ctx.accept("OPEN_BRACKET"));

// Match "]"
// lexer.rule(/\]/, ctx => ctx.accept("CLOSE_BRACKET"));

// Match "\n" at end of a line
lexer.rule(/\n/, ctx => ctx.accept("NEWLINE"));

// Match "O1234", "O12345", ":1234"
lexer.rule(/(?:O|:)(\d{4,5})/, (ctx, match) => {
  ctx.accept("PRG_NUMBER", parseInt(match[1]));
});

// Match "A1", "B2.0", "X41.2142"
lexer.rule(/([A-Z])([#-]*[\d.]+)(?![^(]*\))/, (ctx, match) => {
  let tokenType: string;
  let tokenData: TokenData;

  const prefix = match[1];

  switch (prefix) {
    case "G":
      tokenType = "G_CODE";
      tokenData = {
        prefix,
        raw: match[0],
        desc: gCode(match[0]),
        value: parseInt(match[2])
      };
      break;

    case "M":
      tokenType = "M_CODE";
      tokenData = {
        prefix,
        raw: match[0],
        desc: mCode(match[0]),
        value: parseInt(match[2])
      };
      break;

    default:
      tokenType = `ADDRESS`;
      tokenData = {
        prefix,
        raw: match[0],
        desc: "",
        value: parseFloat(match[2])
      };
      break;
  }

  ctx.accept(tokenType, tokenData);
});

// Match "/", "/3"
lexer.rule(/\/([\d]?)/, (ctx, match) => {
  ctx.accept("BLKSKP", parseInt(match[1]));
});

// Match comment text "(note)", "( comment )"
lexer.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
});

// Ignore " " and "<tab>"
lexer.rule(/[ \t]+/, ctx => ctx.ignore());

// lexer.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
