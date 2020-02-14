import { analyzeCode, getLimits } from "../..";
import { getTestFileContents } from "./readFile";

const testFile = "example3.NC";

const contents = getTestFileContents(testFile);
const program = analyzeCode(contents);
const zLimits = getLimits("Z", program.toolpaths);

test(`find the lower Z extent in ${testFile}`, async () => {
  expect(zLimits?.min).toBe(-2.189);
});

test(`find the upper Z extent in ${testFile}`, async () => {
  expect(zLimits?.max).toBe(3.0);
});
