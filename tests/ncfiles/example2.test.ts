import { analyzeCode, getLimits } from "../../src";
import { getTestFileContents } from "./getTestFileContents";

const contents = getTestFileContents("example2.NC");
const program = analyzeCode(contents);

test("find the largest -Z in example2.NC", async () => {
  const zLimits = getLimits("Z", program.toolpaths);

  expect(zLimits?.min).toBe(-0.8686);
  expect(zLimits?.max).toBe(8.0);
});