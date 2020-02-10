import { NcBlock, parseLine } from "../../src/NcBlock";

const line = "/3 G103 M1. ( TOOL BREAK CHECK )";
const block = parseLine(line);

it(`parsed "${line}" into a NcBlock`, () => {
  expect(block).toBeInstanceOf(NcBlock);
});

it("created the correct number of tokens", () => {
  expect(block.tokens).toHaveLength(4);
});

describe("block.skipLevel", () => {
  it(`defined the property`, () => {
    expect(block.skipLevel).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.skipLevel).toBe(3);
  });
});

it("has G103", () => {
  expect(block.G).toContain(103);
});

describe("block.M", () => {
  test(`defined the property`, () => {
    expect(block.M).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.M).toBe(1.0);
  });
});

describe("block.comment", () => {
  test(`defined the property`, () => {
    expect(block.comment).not.toBeUndefined();
  });

  it(`assigned the value`, () => {
    expect(block.comment).toBe("TOOL BREAK CHECK");
  });
});
