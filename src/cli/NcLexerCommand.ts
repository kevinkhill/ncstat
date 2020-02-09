/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { getTokensFromFile } from "./getTokensFromFile";

export class NcLexerCommand extends getTokensFromFile {
  @Command.Path(`tokenize`)
  async execute() {
    try {
      const tokens = await this.getTokensFromFile();

      for (const token of tokens) {
        this.context.stdout.write(token.toString());
        this.context.stdout.write("\n");
      }
    } catch (err) {
      this.context.stderr.write(err.toString());
    }
  }
}
