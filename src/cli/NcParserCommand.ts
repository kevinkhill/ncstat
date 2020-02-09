/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { getTokenGenerator } from "../NcLexer";
import { getBlockGenerator } from "../NcParser/getBlocks";
import { BaseCommand } from "./BaseCommand";

export class NcParserCommand extends BaseCommand {
  @Command.Path(`parse`)
  // eslint-disable-next-line class-methods-use-this
  async execute() {
    try {
      const tokens = getTokenGenerator(
        await this.readFile(),
        this.debug
      );

      const blocks = getBlockGenerator(tokens);

      for (const block of blocks) {
        this.context.stdout.write(block.toString());
        this.context.stdout.write("\n");
      }
    } catch (err) {
      this.context.stderr.write(err.toString());
    }
  }
}
