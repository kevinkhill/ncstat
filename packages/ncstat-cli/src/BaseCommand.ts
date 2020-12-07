import { Command } from "clipanion";

import { MyContext } from "./context";

export default abstract class BaseCommand extends Command<MyContext> {
  @Command.String(`--cwd`, { hidden: true })
  cwd!: string;

  abstract execute(): Promise<number | void>;
}
