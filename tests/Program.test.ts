import { NcFile } from "@/NcFile";

import { getTestNcFile } from "./helpers";

test("Test Program", async () => {
  const filepath = getTestNcFile("example2.NC");
  const ncfile = await NcFile.createFromPath(filepath);
  const program = await ncfile.analyze();

  expect(program.toolpaths).toHaveLength(6);
});
