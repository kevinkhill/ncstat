import { analyzeCode, getZLimits } from "../../src";
import { getTestFileContents } from "./getTestFileContents";

const contents = getTestFileContents("example1.NC");
const program = analyzeCode(contents);

test("find the largest -Z in example3.NC", async () => {
  const zLimits = getZLimits(program.toolpaths);

  expect(zLimits?.min).toBe(-2.189);
});
