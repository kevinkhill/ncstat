import Tokenizr from "tokenizr";

import { ADDRESS_REGEX, BLOCK_SKIP_REGEX, COMMENT_REGEX } from "../lib";

const sample = `
%
O1234 (TEST PROGRAM)
(CREATED: 12/20/2019)
(TOOLS)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

N43 ( DRILL FOR M5 X 0.8 ROLL TAP )
T43 M6 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G54
M22
B90.
M21
X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
Y1.5
X5.
G80
M30
%
`;

const lexer = new Tokenizr();

lexer.rule(ADDRESS_REGEX, (ctx, match) => {
  ctx.accept("address");
});
lexer.rule(BLOCK_SKIP_REGEX, (ctx, match) => {
  ctx.accept("block_skip", parseInt(match[0]));
});
lexer.rule(COMMENT_REGEX, (ctx, match) => {
  ctx.accept("comment", match[1]);
});
lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
  ctx.ignore();
});
lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
  ctx.ignore();
});
// lexer.rule(/./, (ctx, match) => {
//   ctx.accept("char");
// });

lexer.input(sample);
lexer.debug(true);
try {
  lexer.tokens().forEach(token => {
    console.log(token.toString());
  });
} catch (err) {
  console.error(err.toString());
}
