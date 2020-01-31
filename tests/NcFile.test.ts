import { get, map, minBy } from "lodash/fp";

import { AxisLimits, getLimits, Toolpath } from "../src";
import { Program } from "../src/Program";
import { getTestNcFileContents } from "./helpers";

const getZlimits = (toolpaths: Toolpath[]): AxisLimits => {
  return minBy(
    get("min"),
    map(getLimits("Z"), toolpaths)
  ) as AxisLimits;
};

test("find the largest -Z in example1.NC", async () => {
  const contents = await getTestNcFileContents("example1.NC");
  const stats = Program.analyze(contents);
  const zLimits = getZlimits(stats.toolpaths);

  expect(zLimits?.min).toBe(-0.5631);
});

test("find the largest -Z in example2.NC", async () => {
  const contents = await getTestNcFileContents("example2.NC");
  const stats = Program.analyze(contents);
  const zLimits = getZlimits(stats.toolpaths);

  expect(zLimits?.min).toBe(-0.8686);
});

test("find the largest -Z in example3.NC", async () => {
  const contents = await getTestNcFileContents("example3.NC");
  const stats = Program.analyze(contents);
  const zLimits = getZlimits(stats.toolpaths);

  expect(zLimits?.min).toBe(-2.189);
});
