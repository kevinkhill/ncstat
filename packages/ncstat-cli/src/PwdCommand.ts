import { Command } from "clipanion";

import { MyContext } from "./context";

export default class PwdCommand extends Command<MyContext> {
  async execute(): Promise<void> {
    this.context.stdout.write(`${this.context.cwd}\n`);
  }
}
