import Tokenizr from "tokenizr";

import { Address } from "../NcCodes/Address";
import { Tokens } from "./Tokens";

export const lexer = new Tokenizr();

/**
 * Match
 */
lexer.rule(Tokens.PRG_DELIM, ctx => {
  ctx.accept("PRG_DELIM");
});

lexer.rule(Tokens.PRG_NUMBER, ctx => {
  ctx.accept("PRG_NUMBER");
});

lexer.rule(Tokens.NEWLINE, ctx => {
  ctx.accept("NEWLINE");
});

lexer.rule(Tokens.ADDRESS, (ctx, match) => {
  ctx.accept("ADDRESS", Address.parse(match[1]));
});

lexer.rule(Tokens.G_CODE, (ctx, match) => {
  ctx.accept("G_CODE", Address.parse(match[1]));
});

lexer.rule(Tokens.M_CODE, (ctx, match) => {
  ctx.accept("M_CODE", Address.parse(match[1]));
});

lexer.rule(Tokens.BLOCK_SKIP, (ctx, match) => {
  ctx.accept("BLKSKP", parseInt(match[1]));
});

lexer.rule(Tokens.COMMENT, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
});

/**
 * Ignore
 */
[Tokens.WHITESPACE, Tokens.JS_STYLE_COMMENT].forEach(ignoreRule => {
  lexer.rule(ignoreRule, ctx => ctx.ignore());
});
