import { NcFile } from "../src/NcFile";
import { getTestNcFile } from "./helpers";

test.skip("Test toolpath count", async () => {
  const ncfile = await NcFile.createFromPath(getTestNcFile("example.NC"));

  const program = ncfile.analyze();

  expect(program.toolpaths).toHaveLength(6);
});
