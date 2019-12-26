import { getDeepestZ } from "../src/lib/deepest-z";
import { Program } from "../src/Program";
import { getTestNcFileContents } from "./helpers";

test("find the largest -Z in example1.NC", async () => {
  const contents = await getTestNcFileContents("example1.NC");
  const program = Program.create(contents);

  expect(getDeepestZ(program)).toBe(-0.5631);
});

test("find the largest -Z in example2.NC", async () => {
  const contents = await getTestNcFileContents("example2.NC");
  const program = Program.create(contents);

  expect(getDeepestZ(program)).toBe(-0.8686);
});

test("find the largest -Z in example3.NC", async () => {
  const contents = await getTestNcFileContents("example3.NC");
  const program = Program.create(contents);

  expect(getDeepestZ(program)).toBe(-2.189);
});
