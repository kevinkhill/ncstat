import { getTokens } from "./src/NcLexer/getTokens";

const input = `%
O1234 (TEST PROGRAM)
(CREATED: 12/20/2019)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N43 ( #14 [.182"] DRILL, CARB, TSC )
T43 M6
G0 G90 G54 X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
Y1.5
X5.
G80
M30
%`;

// We don't need to test NEWLINE tokens here
const tokens = getTokens(input).filter(token => {
  return token.type !== "NEWLINE";
});

tokens.forEach(token => {
  console.log(token.toString());
});
