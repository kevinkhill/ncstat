import test from "ava";
import { Block } from "../src/Program/Block";

const testMsg = l => `Parsing: ${l}`;

const line1 = "M80 S762";
test(testMsg(line1), t => {
  const block = new Block(line1);
  t.true(block.M80);
  t.is(block.S, 762);
});

const line2 = "G0 G90 G55";
test(testMsg(line2), t => {
  const block = new Block(line2);
  t.true(block.G0);
  t.true(block.G90);
  t.true(block.G55);
});

const line3 = "X1.75 Y.19 S762 M3";
test(testMsg(line3), t => {
  const block = new Block(line3);
  t.true(block.G98);
  t.true(block.G81);
  t.is(block.Z, -0.5631);
  t.is(block.R, 0.1);
  t.is(block.F, 83.96);
});

const line4 = "G98 G81 Z-.5631 R.1 F83.96";
test(testMsg(line4), t => {
  const block = new Block(line4);
  t.true(block.G98);
  t.true(block.G81);
  t.is(block.Z, -0.5631);
  t.is(block.R, 0.1);
  t.is(block.F, 83.96);
});

const line5 = "N44 ( M5 X 0.8 ROLL TAP, PULLEY )";
test(testMsg(line5), t => {
  const block = new Block(line5);
  console.log(block);
  t.is(block.N, 44);
  t.is(block.comment, "M5 X 0.8 ROLL TAP, PULLEY");
});

const line6 = "/3 G103 M1. ( TOOL BREAK CHECK )";
test(testMsg(line6), t => {
  const block = new Block(line6);
  t.is(block.blockSkip, "/3");
  t.true(block.G103);
  t.is(block.comment, "TOOL BREAK CHECK");
});
