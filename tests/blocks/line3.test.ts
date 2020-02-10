import { NcBlock, parseLine } from "../../src/NcBlock";

const line = "G0 G90 G55";
const block = parseLine(line);

it(`parsed "${line}" into a NcBlock`, () => {
  expect(block).toBeInstanceOf(NcBlock);
});

it("created the correct number of tokens", () => {
  expect(block.tokens).toHaveLength(3);
});

it("has G0", () => {
  expect(block.G).toContain(0);
});

it("has G90", () => {
  expect(block.G).toContain(90);
});

it("has G55", () => {
  expect(block.G).toContain(55);
});
