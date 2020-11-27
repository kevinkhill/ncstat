import { Command } from "clipanion";

import { MyContext } from "./context";

export default abstract class BaseCommand extends Command<MyContext> {
  cwd = Command.String(`--cwd`, { hidden: true });

  abstract execute(): Promise<number | void>;
}
