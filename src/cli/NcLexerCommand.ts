/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { getTokenGenerator } from "../NcLexer";
import { GetFileContents } from "./GetFileContents";

export class NcLexerCommand extends GetFileContents {
  @Command.Boolean(`-d,--debug`)
  public debug = false;

  @Command.Path(`tokenize`)
  async execute() {
    try {
      const tokens = getTokenGenerator(
        await this.getFileContents(),
        this.debug
      );

      for (const token of tokens) {
        this.context.stdout.write(token.toString());
        this.context.stdout.write("\n");
      }
    } catch (err) {
      this.context.stderr.write(err.toString());
    }
  }
}
