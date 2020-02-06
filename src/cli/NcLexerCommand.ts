/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";
import fs from "fs";

import { getTokens } from "../NcLexer";

export class NcLexerCommand extends Command {
  @Command.String({ required: true })
  public filepath!: string;

  @Command.Path(`lex`)
  // eslint-disable-next-line class-methods-use-this
  async execute() {
    const buffer = await fs.promises.readFile(this.filepath);
    const tokens = getTokens(buffer.toString());

    try {
      for (const token of tokens) {
        this.context.stdout.write(token.toString());
        this.context.stdout.write("\n");
      }
    } catch (err) {
      this.context.stderr.write(err.toString());
    }
  }
}
