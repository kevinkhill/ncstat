import { Block } from "../src/NcFile/Block";

const line1 = "M80 S762";
test(`Parsing: ${line1}`, function() {
  const block = Block.parse(line1);

  expect(block.M(80)).toBeTruthy();
  expect(block.values.S).toBe(762);
});

const line2 = "G0 G90 G55";
test(`Parsing: ${line2}`, function() {
  const block = Block.parse(line2);

  expect(block.G(0)).toBeTruthy();
  expect(block.G(90)).toBeTruthy();
  expect(block.G(55)).toBeTruthy();
});

const line3 = "X1.75 Y.19 S762 M3";
test(`Parsing: ${line3}`, function() {
  const block = Block.parse(line3);

  expect(block.values.X).toBe(1.75);
  expect(block.values.Y).toBe(0.19);
  expect(block.values.S).toBe(762);
  expect(block.M(3)).toBeTruthy();
});

const line4 = "G98 G81 Z-.5631 R.1 F83.96";
test(`Parsing: ${line4}`, function() {
  const block = Block.parse(line4);

  expect(block.G(98)).toBeTruthy();
  expect(block.G(81)).toBeTruthy();
  expect(block.values.Z).toBe(-0.5631);
  expect(block.values.R).toBe(0.1);
  expect(block.values.F).toBe(83.96);
});

const line5 = "N44 ( M5 X 0.8 ROLL TAP, PULLEY )";
test(`Parsing: ${line5}`, function() {
  const block = Block.parse(line5);

  expect(block.values.N).toBe(44);
  expect(block.getComment()).toBe("M5 X 0.8 ROLL TAP, PULLEY");
});

const line6 = "/3 G103 M1. ( TOOL BREAK CHECK )";
test(`Parsing: ${line6}`, function() {
  const block = Block.parse(line6);

  expect(block.blockSkip).toBe("/3");
  expect(block.G(103)).toBeTruthy();
  expect(block.getComment()).toBe("TOOL BREAK CHECK");
});
