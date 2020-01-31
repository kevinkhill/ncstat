import { getLimits, Tool, Toolpath } from "../src/Toolpath";

let toolpath: Toolpath;

const sampleToolpath = `M107
N83 ( 1/2" BALL MILL, 2 FLT )
T83 M106
M01 ( 1/2" BALL MILL, 2 FLT )
G0 G90 G54
B0.
X-1.4483 Y-2.4167 S10000 M3
G43 H83 Z1. M8 T97
Z.5
G1 Z-.3 F100.
G41 D83 X-1.4417 F60.
G3 X-1.275 Y-2.25 I0. J.1667
G1 Y-.765
G2 X-.985 Y-.475 I.29 J0.
G1 X2.735
G2 X3.025 Y-.765 I0. J-.29
G1 Y-3.735
G2 X2.735 Y-4.025 I-.29 J0.
G1 X-.985
G2 X-1.275 Y-3.735 I0. J.29
G1 Y-2.25
Y-2.125
G3 X-1.4417 Y-1.9583 I-.1667 J0.
G1 G40 X-1.4483
G0 Z1.
M09`;

beforeAll(() => {
  toolpath = Toolpath.parse(sampleToolpath);

  toolpath.analyze();
});

test("If a toolpath instance was created", () => {
  expect(toolpath).toBeInstanceOf(Toolpath);
});

test("If the toolpath has the correct # of blocks", () => {
  expect(toolpath).toHaveProperty("blocks");
  expect(toolpath.blocks).toHaveLength(26);
});

test("If the toolpath identified the Tool", () => {
  expect(toolpath).toHaveProperty("tool");
  expect(toolpath.tool).toBeInstanceOf(Tool);
});

test("If the toolpath has a Tool, is it correct", () => {
  expect(toolpath.tool.number).toBe(83);
  expect(toolpath.tool.desc).toBe('1/2" BALL MILL, 2 FLT');
});

test("detect the X limits", () => {
  const { axis, min, max } = getLimits("X", toolpath);

  expect(axis).toBe("X");
  expect(min).toBe(-1.4483);
  expect(max).toBe(3.025);
});

test("detect the Y limits", () => {
  const { axis, min, max } = getLimits("Y", toolpath);

  expect(axis).toBe("Y");
  expect(min).toBe(-4.025);
  expect(max).toBe(-0.475);
});

test("detect the Z limits", () => {
  const { axis, min, max } = getLimits("Z", toolpath);

  expect(axis).toBe("Z");
  expect(min).toBe(-0.3);
  expect(max).toBe(1.0);
});
