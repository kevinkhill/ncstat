import { NcBlock } from "../../src/NcBlock";

const line = "M80 S762";
const block = NcBlock.parse(line);

it(`parsed "${line}" into a NcBlock`, () => {
  expect(block).toBeInstanceOf(NcBlock);
});

it("created the correct number of tokens", () => {
  expect(block.tokens).toHaveLength(2);
});

describe("block.M", () => {
  it(`defined the property`, () => {
    expect(block.M).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.M).toBe(80);
  });
});

describe("block.S", () => {
  test(`defined the property`, () => {
    expect(block.S).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.S).toBe(762);
  });
});
