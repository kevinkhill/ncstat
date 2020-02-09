/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";
import fs from "fs";

import { getTokenGenerator, NcToken } from "../NcLexer";

export abstract class getTokensFromFile extends Command {
  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.String({ required: true })
  public filepath!: string;

  // eslint-disable-next-line class-methods-use-this
  async getTokensFromFile(): Promise<Generator<NcToken>> {
    const buffer = await fs.promises.readFile(this.filepath);

    return getTokenGenerator(buffer.toString(), this.debug);
  }
}
