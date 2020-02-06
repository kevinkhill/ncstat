/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Command } from "clipanion";

export class GreetCommand extends Command {
  @Command.Boolean(`-v,--verbose`)
  public verbose = false;

  @Command.String(`--name`)
  public name?: string;

  @Command.Path(`greet`)
  async execute() {
    if (typeof this.name === `undefined`) {
      this.context.stdout.write(`You're not registered.\n`);
    } else {
      this.context.stdout.write(`Hello, ${this.name}!\n`);
    }
  }
}
