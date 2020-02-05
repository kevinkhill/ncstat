// import { CannedCycle } from "../src/CannedCycle";
import { analyzeCode, Tool } from "../../src";

const sampleProgram = `%
O1234 (TEST PROGRAM)
(CREATED: 12/20/2019)
(TOOLS)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N43( #14 [.182"] DRILL, CARB, TSC )
T43 M6
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
%`;

const program = analyzeCode(sampleProgram);

test("If a toolpath was created", () => {
  expect(program).toHaveProperty("toolpaths");
  expect(program.toolpaths).toHaveLength(1);
});

test("If the toolpath has a Tool", () => {
  expect(program.toolpaths[0].tool).toBeInstanceOf(Tool);
});

test("If the Tool was created from toolchange line", () => {
  const tool = program.toolpaths[0].tool;

  expect(tool?.number).toBe(43);
  expect(tool?.desc).toBe('#14 [.182"] DRILL, CARB, TSC');
});

test.skip("If the N line was comment was preserved", () => {
  expect(program.toolpaths[0].description).toBe(
    "DRILL FOR M5 X 0.8 ROLL TAP"
  );
});
