import { analyzeCode, getLimits, Tool, Toolpath } from "../../src";

const input = `N226 ( SPINDLE PROBE )
M107
T226 M6
M01 ( SPINDLE PROBE )
G0 G90 G54
M22
B0.
M21
X-1.25 Y1.25
G43 H226 Z8. T27
( POINTS AT Z VERIFICATION )
G65 P9832
G65 P7997 X-1.25 Y1.25 Z.22
G65 P7980`;

const program = analyzeCode(input);
const toolpath = program.toolpaths.pop() as Toolpath;

test("If a toolpath instance was created", () => {
  expect(toolpath).toBeInstanceOf(Toolpath);
});

test("If the toolpath has the correct # of blocks", () => {
  expect(toolpath).toHaveProperty("blocks");
  expect(toolpath.blocks).toHaveLength(14);
});

test("If the toolpath identified the Tool", () => {
  expect(toolpath).toHaveProperty("tool");
  expect(toolpath.tool).toBeInstanceOf(Tool);
});

test("If the toolpath has a Tool, is it correct", () => {
  expect(toolpath.tool?.number).toBe(226);
  expect(toolpath.tool?.desc).toBe("SPINDLE PROBE");
});

test("detect the X limits", () => {
  const { axis, min, max } = getLimits("X", toolpath);

  expect(axis).toBe("X");
  expect(min).toBe(-1.25);
  expect(max).toBe(3.025);
});

test("detect the Y limits", () => {
  const { axis, min, max } = getLimits("Y", toolpath);

  expect(axis).toBe("Y");
  expect(min).toBe(1.25);
  expect(max).toBe(-0.475);
});

test("detect the Z limits", () => {
  const { axis, min, max } = getLimits("Z", toolpath);

  expect(axis).toBe("Z");
  expect(min).toBe(0.22);
  expect(max).toBe(1.0);
});
