/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";
import fs from "fs";

import { NcParser } from "NcParser";

export class NcParserCommand extends Command {
  @Command.String({ required: true })
  public filepath!: string;

  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.Path(`parse`)
  async execute() {
    const parser = new NcParser();

    try {
      const buffer = await fs.promises.readFile(this.filepath);
      const program = parser.parse(buffer.toString());

      this.context.stdout.write(program);

      for (const block of program.toArray()) {
        this.context.stdout.write(block.toString());
        this.context.stdout.write("\n");
      }
    } catch (err) {
      // this.context.stderr.write(err.toString());
      this.context.stderr.write(err);
    }
  }
}
