import { Program } from "../src/Program";
import { ProgramAnalysis } from "../src/types/index";
import { getTestNcFileContents } from "./helpers";

let stats: ProgramAnalysis;

beforeAll(async () => {
  const contents = await getTestNcFileContents("example1.NC");

  stats = Program.parse(contents);
});

test.skip("Analyzing example1.NC", async () => {
  expect(stats.toolpaths).toHaveLength(2);
});
