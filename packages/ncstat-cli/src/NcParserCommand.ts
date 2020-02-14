/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { NcParser } from "@ncstat/parser";

import { readFile } from "./readFile";

export class NcParserCommand extends Command {
  @Command.String({ required: true })
  public filepath!: string;

  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.Path(`parse`)
  async execute(): Promise<void> {
    const parser = new NcParser({ debug: this.debug });

    parser.on("error", (error: Error) => {
      this.context.stderr.write(error.toString());
    });

    const program = parser.parse(await readFile(this.filepath));

    this.writeOut(program);
  }

  /**
   * Print the program to stdout, line by line.
   */
  writeOut(program: NcProgram) {
    let blockCount = 1;

    program.forEach(block => {
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
