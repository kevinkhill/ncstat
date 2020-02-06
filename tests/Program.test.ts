import { Program } from "../src";

test("creating a new instance from a string of text lines", async () => {
  const program = new Program(`%\nO1234(TACO)\nG4X1000\nM30\n%`);

  expect(program.getLines()).toHaveLength(5);
});
