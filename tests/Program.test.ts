import { Program } from "../src/Program";
import { getTestNcFileContents } from "./helpers";

test("Analyzing example1.NC", async () => {
  const contents = await getTestNcFileContents("example1.NC");

  const stats = Program.parse(contents);

  expect(stats.toolpaths).toHaveLength(2);
});
