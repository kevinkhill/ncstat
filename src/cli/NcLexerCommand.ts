/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { getTokenGenerator } from "../NcLexer/getTokens";
import { BaseCommand } from "./BaseCommand";

export class NcLexerCommand extends BaseCommand {
  @Command.Path(`lex`)
  // eslint-disable-next-line class-methods-use-this
  async execute() {
    try {
      const tokens = getTokenGenerator(
        await this.readFile(),
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
