import { NcFile } from "../src";

test("creating a new instance from a string of text lines", async () => {
  const ncfile = new NcFile(`%\nO1234(TACO)\nG4X1000\nM30\n%`);

  expect(ncfile.lines).toHaveLength(5);
});
