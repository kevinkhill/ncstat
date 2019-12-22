import { Program } from "../src/Program";

(async () => {
  const program = Program.create(`
%
O1234 (TEST PROGRAM)
(CREATED: 12/20/2019)
(TOOLS)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N43 ( #14 [.182"] DRILL, CARB, TSC )
T43 M6
G0 G90 G54
X1.75 Y.19 S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X2.
Y1.5
X5.
G80
M30
%
`);

  const deepestZ = await program.getDeepestZ();

  console.log(`Deepest Z = ${deepestZ}`);
})();
