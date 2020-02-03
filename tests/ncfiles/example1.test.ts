import { analyzeCode, getLimits, Tool } from "../../src";
import { getTestFileContents } from "./getTestFileContents";

const contents = getTestFileContents("example1.NC");
const program = analyzeCode(contents);

test("find the largest -Z in example1.NC", async () => {
  const zLimits = getLimits("Z", program.toolpaths);

  expect(zLimits?.min).toBe(-0.5631);
  expect(zLimits?.max).toBe(1.0);
});

test("If the toolpaths were identified", () => {
  expect(program.toolpaths).toHaveLength(2);

  const [drill, tap] = program.toolpaths;

  // console.log(drill);

  expect(drill).toHaveProperty("tool");
  expect(drill.tool).toBeInstanceOf(Tool);
  expect(drill?.tool?.number).toBe(43);
  expect(drill?.tool?.desc).toBe('#14 [.182"] DRILL, CARB, TSC');

  expect(tap).toHaveProperty("tool");
  expect(tap.tool).toBeInstanceOf(Tool);
  expect(tap?.tool?.number).toBe(44);
  expect(tap?.tool?.desc).toBe("M5 X 0.8 ROLL TAP, PULLEY");
});
