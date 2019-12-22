import { NcFile } from "../src/NcFile";
import { getTestNcFile } from "./helpers";

test("Test getting lines and line count.", async () => {
  const filepath = getTestNcFile("example2.NC");
  const ncfile = await NcFile.fromPath(filepath);

  expect(ncfile.getLines()).toHaveLength(444);
});
