import { Block } from "../src/Block";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const testMsg = (l: string) => `Parsing: ${l}`;

const line1 = "M80 S762";
test(testMsg(line1), () => {
  const block = Block.parse(line1);

  expect(block.M(80)).toBeTruthy();
  expect(block.values.S).toBe(762);
});

const line2 = "G0 G90 G55";
test(testMsg(line2), () => {
  const block = Block.parse(line2);

  expect(block.G(0)).toBeTruthy();
  expect(block.G(90)).toBeTruthy();
  expect(block.G(55)).toBeTruthy();
  expect(block.isStartOfCannedCycle()).toBeFalsy();
});

const line3 = "X1.75 Y.19 S762 M3";
test(testMsg(line3), () => {
  const block = Block.parse(line3);

  expect(block.values.X).toBe(1.75);
  expect(block.values.Y).toBe(0.19);
  expect(block.values.S).toBe(762);
  expect(block.M(3)).toBeTruthy();
});

const line4 = "G98 G81 Z-.5631 R.1 F83.96";
test(testMsg(line4), () => {
  const block = Block.parse(line4);

  expect(block.G(98)).toBeTruthy();
  expect(block.G(81)).toBeTruthy();
  expect(block.values.Z).toBe(-0.5631);
  expect(block.values.R).toBe(0.1);
  expect(block.values.F).toBe(83.96);
});

const line5 = "N44 ( M5 X 0.8 ROLL TAP, PULLEY )";
test(testMsg(line5), () => {
  const block = Block.parse(line5);

  expect(block.values.N).toBe(44);
  expect(block.getComment()).toBe("M5 X 0.8 ROLL TAP, PULLEY");
});

const line6 = "/3 G103 M1. ( TOOL BREAK CHECK )";
test(testMsg(line6), () => {
  const block = Block.parse(line6);

  expect(block.blockSkip).toBe("/3");
  expect(block.G(103)).toBeTruthy();
  expect(block.getComment()).toBe("TOOL BREAK CHECK");
});

const line7 = "G83 G99 Z-.75 R.1 Q.144 F50.";
test.only(testMsg(line7), () => {
  const block = Block.parse(line7);

  expect(block.isStartOfCannedCycle()).toBeTruthy();
  expect(block.getCannedCycleStartCode()).toBe("G83");
  expect(block.getRetractCode()).toBe("G99");
});

const line8 = "G43 H27 Z1. T17";
test(testMsg(line8), () => {
  const block = Block.parse(line8);

  expect(block.G(0)).toBeTruthy();
  expect(block.G(90)).toBeTruthy();
  expect(block.G(55)).toBeTruthy();
  expect(block.isStartOfCannedCycle()).toBeFalsy();
});
