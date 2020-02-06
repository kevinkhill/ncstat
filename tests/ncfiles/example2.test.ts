import { analyzeCode, getLimits } from "../../src";
import { getTestFileContents } from "./getTestFileContents";

const testFile = "example2.NC";

const contents = getTestFileContents(testFile);
const program = analyzeCode(contents);
const zLimits = getLimits("Z", program.toolpaths);

test(`find the lower Z extent in ${testFile}`, async () => {
  expect(zLimits?.min).toBe(-0.8686);
});

test(`find the upper Z extent in ${testFile}`, async () => {
  expect(zLimits?.max).toBe(8.0);
});
