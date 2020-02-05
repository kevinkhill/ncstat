import Tokenizr from "tokenizr";

import { Address } from "../../NcCodes/Address";

export const PRG_DELIM_REGEX = /%/;
export const NEWLINE_REGEX = /\n/;
export const BLOCK_SKIP_REGEX = /^\/([0-9]?)/;
export const COMMENT_REGEX = /\(\s?(.+)\s?\)/;
export const FEEDRATE_REGEX = /F([0-9]+(?:\\.[0-9]*)?)/;
export const ADDRESS_REGEX = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/;

export const lexer = new Tokenizr();

// Match "%" literal, required for proper NC file
lexer.rule(PRG_DELIM_REGEX, ctx => {
  ctx.accept("PRG_DELIM");
});

// Match newline "\n" end of a line/block
lexer.rule(NEWLINE_REGEX, ctx => {
  ctx.accept("EOB");
});

// Match AlphaNums "A1", "B2.0"
lexer.rule(ADDRESS_REGEX, (ctx, match) => {
  ctx.accept("ADDRESS", Address.parse(match[0]));
});

// Match "/"
lexer.rule(BLOCK_SKIP_REGEX, (ctx, match) => {
  ctx.accept("BLKSKP", parseInt(match[0]));
});

// Match "(string)""
lexer.rule(COMMENT_REGEX, (ctx, match) => {
  ctx.accept("COMMENT", match[1]);
});

// Ignore comments
lexer.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());

// Ignore indentation
lexer.rule(/[ \t]+/, ctx => ctx.ignore());
