import { analyzeCode, getZLimits } from "../../src";
import { getTestFileContents } from "./getTestFileContents";

const contents = getTestFileContents("example2.NC");
const program = analyzeCode(contents);

test("find the largest -Z in example2.NC", async () => {
  const zLimits = getZLimits(program.toolpaths);

  expect(zLimits?.min).toBe(-0.8686);
});
