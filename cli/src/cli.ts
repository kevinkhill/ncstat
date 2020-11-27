import { Cli } from "clipanion";

import { MyContext } from "./context";
import ParseCommand from "./ParseCommand";
import PwdCommand from "./PwdCommand";

export const cli = Cli.from<MyContext>([PwdCommand, ParseCommand], {
  binaryLabel: "Command line utility for @ncstat/parser",
  binaryName: "ncstat",
  binaryVersion: "1.0.0"
});

// cli.register(Command.Entries.Help);
// cli.register(Command.Entries.Version);

cli.runExit(process.argv.slice(2), {
  ...Cli.defaultContext,
  cwd: process.cwd()
});
