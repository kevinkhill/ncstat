/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { NcLexer } from "NcLexer";

import { readFile } from "./readFile";

export class NcLexerCommand extends Command {
  @Command.String({ required: true })
  public filepath!: string;

  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.Path(`tokenize`)
  async execute() {
    const lexer = new NcLexer({ debug: this.debug });

    try {
      const tokens = lexer.tokenize(await readFile(this.filepath));

      for (const token of tokens) {
        this.context.stdout.write(token.toString());
        this.context.stdout.write("\n");
      }
    } catch (err) {
      this.context.stderr.write(err.toString());
    }
  }
}
