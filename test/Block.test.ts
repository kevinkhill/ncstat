import test from "ava";
import { Block } from "../src/Program/Block";

const testMsg = l => `Parsing: ${l}`;

const line1 = "M80 S762";
test(testMsg(line1), t => {
  const block = new Block(line1);
  t.true(block.M(80));
  t.is(block.values.S, 762);
});

const line2 = "G0 G90 G55";
test(testMsg(line2), t => {
  const block = new Block(line2);
  t.true(block.G(0));
  t.true(block.G(90));
  t.true(block.G(55));
});

const line3 = "X1.75 Y.19 S762 M3";
test(testMsg(line3), t => {
  const block = new Block(line3);
  t.is(block.values.X, 1.75);
  t.is(block.values.Y, 0.19);
  t.is(block.values.S, 762);
  t.true(block.M(3));
});

const line4 = "G98 G81 Z-.5631 R.1 F83.96";
test(testMsg(line4), t => {
  const block = new Block(line4);
  t.true(block.G(98));
  t.true(block.G(81));
  t.is(block.values.Z, -0.5631);
  t.is(block.values.R, 0.1);
  t.is(block.values.F, 83.96);
});

const line5 = "N44 ( M5 X 0.8 ROLL TAP, PULLEY )";
test(testMsg(line5), t => {
  const block = new Block(line5);
  t.is(block.values.N, 44);
  t.is(block.getComment(), "M5 X 0.8 ROLL TAP, PULLEY");
});

const line6 = "/3 G103 M1. ( TOOL BREAK CHECK )";
test(testMsg(line6), t => {
  const block = new Block(line6);
  t.is(block.blockSkip, "/3");
  t.true(block.G(103));
  t.is(block.getComment(), "TOOL BREAK CHECK");
});
