/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";
import fs from "fs";

import { NcBlock } from "NcBlock";
import { NcParser } from "NcParser";

export class NcParserCommand extends Command {
  @Command.String({ required: true })
  public filepath!: string;

  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.Path(`parse`)
  async execute() {
    const parser = new NcParser({ debug: this.debug });

    parser.on("error", (error: Error) => {
      this.context.stderr.write(error.toString());
    });

    const buffer = await fs.promises.readFile(this.filepath);
    const program = parser.parse(buffer.toString());

    program.forEach((block: NcBlock) => {
      this.context.stdout.write(`${block.toString()}\n`);
    });
  }
}
