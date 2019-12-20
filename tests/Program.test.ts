import { NcFile } from "../src/NcFile";
import { Program } from "../src/Program";
import { getTestNcFile } from "./helpers";

test("Test Program", async () => {
  const filepath = getTestNcFile("example2.NC");

  const ncfile = await NcFile.createFromPath(filepath);

  const program = Program.analyzeNcFile(ncfile);

  expect(program.toolpaths).toHaveLength(6);
});
