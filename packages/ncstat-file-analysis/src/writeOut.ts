import { NcBlock, NcProgram } from "@ncstat/parser";

const print = (line: string) => process.stdout.write(line);

export function writeOut(program: NcProgram): void {
  let blockCount = 1;

  program.forEach((block: NcBlock) => {
    print("N" + ("0000" + blockCount).slice(-4) + ": ");
    print(`${block.toString()}\n`);

    blockCount++;
  });

  print(`\n Parsed ${blockCount} lines of NC code.\n\n`);
}
