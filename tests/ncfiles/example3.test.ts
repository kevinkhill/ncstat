import { analyzeCode, getLimits } from "../../src";
import { getTestFileContents } from "./getTestFileContents";

const contents = getTestFileContents("example3.NC");
const program = analyzeCode(contents);

test("find the largest -Z in example3.NC", async () => {
  const zLimits = getLimits("Z", program.toolpaths);

  expect(zLimits?.min).toBe(-2.189);
  expect(zLimits?.max).toBe(3.0);
});
