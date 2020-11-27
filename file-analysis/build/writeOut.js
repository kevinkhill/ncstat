"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeOut = writeOut;

const print = (line) => process.stdout.write(line);

function writeOut(program) {
  let blockCount = 1;
  program.forEach((block) => {
    print("N" + ("0000" + blockCount).slice(-4) + ": ");
    print(`${block.toString()}\n`);
    blockCount++;
  });
  print(`\n Parsed ${blockCount} lines of NC code.\n\n`);
}
