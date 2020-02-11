/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";
import fs from "fs";

export abstract class GetFileContents extends Command {
  @Command.String({ required: true })
  public filepath!: string;

  // eslint-disable-next-line class-methods-use-this
  async getFileContents(): Promise<string> {
    const buffer = await fs.promises.readFile(this.filepath);

    return buffer.toString();
  }
}
