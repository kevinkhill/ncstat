import test from "ava";
import { Program } from "../src";

test.skip("Test Program", async t => {
  const program = new Program("./nc/example.NC");

  await program.analyze();

  t.is(program.toolpaths.length, 6);
});
