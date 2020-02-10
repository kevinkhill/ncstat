import { NcBlock, parseLine } from "../../src/NcBlock";

const line = "G43 H27 Z1. T17";
const block = parseLine(line);

it(`parsed "${line}" into a NcBlock`, () => {
  expect(block).toBeInstanceOf(NcBlock);
});

it("created the correct number of tokens", () => {
  expect(block.tokens).toHaveLength(4);
});

it("has G43", () => {
  expect(block.G).toContain(43);
});

describe("block.H", () => {
  test(`defined the property`, () => {
    expect(block.H).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.H).toBe(27);
  });
});

describe("block.Z", () => {
  it(`defined the property`, () => {
    expect(block.Z).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.Z).toBe(1.0);
  });
});

describe("block.T", () => {
  test(`defined the property`, () => {
    expect(block.T).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.T).toBe(17);
  });
});
