/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";
import fs from "fs";

export abstract class BaseCommand extends Command {
  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.String({ required: true })
  public filepath!: string;

  // eslint-disable-next-line class-methods-use-this
  async readFile(): Promise<string> {
    const buffer = await fs.promises.readFile(this.filepath);

    return buffer.toString();
  }
}
