import test from "ava";
import { Block } from "../src/Program/Block";

let line;
const testMsg = l => `Parsing: ${l}`;

line = "M80 S762";
test(testMsg(line), t => {
  const block = new Block(line);
  t.true(block.M80);
  t.is(block.S, 762);
});

line = "G0 G90 G55";
test(testMsg(line), t => {
  const block = new Block(line);
  t.true(block.G0);
  t.true(block.G90);
  t.true(block.G55);
});

line = "X1.75 Y.19 S762 M3";
test(testMsg(line), t => {
  const block = new Block(line);
  t.true(block.G98);
  t.true(block.G81);
  t.is(block.Z, -0.5631);
  t.is(block.R, 0.1);
  t.is(block.F, 83.96);
});

line = "G98 G81 Z-.5631 R.1 F83.96";
test(testMsg(line), t => {
  const block = new Block(line);
  t.true(block.G98);
  t.true(block.G81);
  t.is(block.Z, -0.5631);
  t.is(block.R, 0.1);
  t.is(block.F, 83.96);
});

line = "N44 ( M5 X 0.8 ROLL TAP, PULLEY )";
test(testMsg(line), t => {
  const block = new Block(line);
  t.is(block.N, 44);
  t.is(block.comment, "M5 X 0.8 ROLL TAP, PULLEY");
});

line = "/3 G103 M1. ( TOOL BREAK CHECK )";
test(testMsg(line), t => {
  const block = new Block(line);
  t.is(block.blockSkip, "/3");
  t.is(block.comment, "TOOL BREAK CHECK");
});
