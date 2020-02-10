import { NcBlock } from "../../src/NcBlock";

const line = "G98 G81 Z-.5631 R.1 F83.96";
const block = NcBlock.parse(line);

it(`parsed "${line}" into a NcBlock`, () => {
  expect(block).toBeInstanceOf(NcBlock);
});

it("created the correct number of tokens", () => {
  expect(block.tokens).toHaveLength(5);
});

it("has G98", () => {
  expect(block.G).toContain(98);
});

it("has G81", () => {
  expect(block.G).toContain(81);
});

describe("block.Z", () => {
  it(`defined the property`, () => {
    expect(block.Z).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.Z).toBe(-0.5631);
  });
});

describe("block.R", () => {
  test(`defined the property`, () => {
    expect(block.R).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.R).toBe(0.1);
  });
});

describe("block.F", () => {
  test(`defined the property`, () => {
    expect(block.F).not.toBeNaN();
  });

  it(`assigned the value`, () => {
    expect(block.F).toBe(83.96);
  });
});
