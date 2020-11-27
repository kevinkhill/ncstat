import { Cli, Command } from "clipanion";

import LexCommand from "./commands/Lex";
import ParseCommand from "./commands/Parse";

export const cli = new Cli({
  binaryLabel: "Command line utility for @ncstat/parser",
  binaryName: "ncstat",
  binaryVersion: "1.0.0"
});

cli.register(Command.Entries.Help);
cli.register(Command.Entries.Version);

cli.register(LexCommand);
cli.register(ParseCommand);

cli.runExit(process.argv.slice(2), {
  ...Cli.defaultContext
});
