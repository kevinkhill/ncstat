/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

import { getBlockGenerator } from "../NcParser";
import { getTokensFromFile } from "./getTokensFromFile";

export class NcParserCommand extends getTokensFromFile {
  @Command.Path(`parse`)
  async execute() {
    try {
      const tokens = await this.getTokensFromFile();
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
