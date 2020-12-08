const { NcLexer } = require("./build");

const lexer = new NcLexer();

const sample = `%
O1234 (TEST PROGRAM)

N43 ( 1/4" [.250"] DRILL )
T43 M6
G00 G90 G54 X.75 Y.19
S2000 M3
G43 H1 Z1.
G98 G81 Z-.5631 R.1 F83.96
X5.
G80
M30
%`;

for (const token of lexer.tokens(sample)) {
  console.log(`${token}`);
}
