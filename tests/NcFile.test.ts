import { NcFile } from "@/NcFile";

import { getTestNcFile } from "./helpers";

test("Test getting lines and line count.", async () => {
  const filepath = getTestNcFile("example2.NC");
  const ncfile = await NcFile.createFromPath(filepath);

  expect(ncfile.getLines()).toHaveLength(444);
});
