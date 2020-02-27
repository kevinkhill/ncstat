import { NcParser } from '../NcParser';
import { getNcFileContents } from "./utils";

const parser = new NcParser();

const testFile = "example2.NC";
const contents = getNcFileContents(testFile);
const program = parser.parse(contents);
// const zLimits = getLimits("Z", program.toolpaths);

test.skip(`find the lower Z extent in ${testFile}`, async () => {
  // expect(zLimits?.min).toBe(-0.8686);
});

test.skip(`find the upper Z extent in ${testFile}`, async () => {
  // expect(zLimits?.max).toBe(8.0);
});
