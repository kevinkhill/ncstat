import { CannedCycle } from "../src/CannedCycle";
import { Program } from "../src/Program";
import { Tool } from "../src/Tool";
import { ProgramAnalysis } from "../src/types";

let stats: ProgramAnalysis;

const sampleProgram = `
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

beforeAll(() => {
  const program = Program.create(sampleProgram);

  stats = program.analyze();
});

test("If a toolpath was created", () => {
  expect(stats).toHaveProperty("toolpaths");
});

test("If the toolpath is identified as a CannedCycle", () => {
  expect(stats.toolpaths[0]).toBeInstanceOf(CannedCycle);
});

test("If the toolpath has a Tool", () => {
  expect(stats.toolpaths[0].tool).toBeInstanceOf(Tool);
});

test("If the Tool has the proper info", () => {
  const tool = stats.toolpaths[0].tool;

  expect(tool.number).toBe(43);
  expect(tool.desc).toBe('#14 [.182"] DRILL, CARB, TSC');
});

test("If extents were properly identified", () => {
  expect(stats.extents.X.min).toBe(0.75);
  expect(stats.extents.X.max).toBe(5.0);

  expect(stats.extents.Y.min).toBe(0.19);
  expect(stats.extents.Y.max).toBe(1.5);

  expect(stats.extents.Z.min).toBe(-0.5631);
  expect(stats.extents.Z.max).toBe(null);

  expect(stats.extents.B.min).toBe(0);
  expect(stats.extents.B.max).toBe(90.0);
});
