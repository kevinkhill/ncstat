import { NcBlock, parseLine } from "../../src/NcBlock";

const line = "X1.75 Y.19 S12000 M3";
const block = parseLine(line);

it(`parsed "${line}" into a NcBlock`, () => {
  expect(block).toBeInstanceOf(NcBlock);
});

it("created the correct number of tokens", () => {
  expect(block.tokens).toHaveLength(4);
});

describe("block.X", () => {
  it(`defined the property`, () => {
    expect(block.X).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.X).toBe(1.75);
  });
});

describe("block.Y", () => {
  test(`defined the property`, () => {
    expect(block.Y).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.Y).toBe(0.19);
  });
});

describe("block.S", () => {
  test(`defined the property`, () => {
    expect(block.S).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.S).toBe(12000);
  });
});

describe("block.M", () => {
  test(`defined the property`, () => {
    expect(block.M).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.M).toBe(3);
  });
});
