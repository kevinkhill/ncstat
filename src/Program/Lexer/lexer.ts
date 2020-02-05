import Tokenizr from "tokenizr";

import {
  ADDRESS_REGEX,
  BLOCK_SKIP_REGEX,
  COMMENT_REGEX
} from "../../lib";

export const lexer = new Tokenizr();

// Match "%" literal, required for proper NC file
lexer.rule(/%/, ctx => {
  ctx.accept("PRG_DELIM");
});

// Match newline "\n" end of a line/block
lexer.rule(/\n/, ctx => {
  ctx.accept("EOB");
});

// Match AlphaNums "A1", "B2.0"
lexer.rule(ADDRESS_REGEX, ctx => {
  ctx.accept("ADDRESS");
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
