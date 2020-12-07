import { NcBlock, NcParser, NcProgram } from "@ncstat/parser";
import { Command } from "clipanion";
import fs from "fs";
import path from "path";

import { MyContext } from "./context";

const readFile = fs.promises.readFile;

export default class ParseCommand extends Command<MyContext> {
  @Command.Boolean(`--debug`)
  debug = false;

  @Command.String({ required: true })
  filepath!: string;

  @Command.Path(`parse`)
  async execute(): Promise<void> {
    const parser = new NcParser({ debug: this.debug });

    parser.on("error", (error: Error) => {
      this.context.stderr.write(error.toString());
    });

    const resolved = path.join(this.context.cwd, this.filepath);

    const contents = await readFile(resolved, "utf-8");

    const program = parser.parse(contents);

    this.writeOut(program);
  }

  /**
   * Print the program to stdout, line by line.
   */
  writeOut(program: NcProgram): void {
    let blockCount = 1;

    program.blocks.forEach((block: NcBlock) => {
      this.context.stdout.write(
        "N" + ("0000" + blockCount).slice(-4) + ": "
      );

      this.context.stdout.write(`${block.toString()}\n`);

      blockCount++;
    });

    this.context.stdout.write(
      `\n Parsed ${blockCount} lines of NC code.\n\n`
    );
  }
}
