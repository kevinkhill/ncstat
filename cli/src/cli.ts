import { Cli } from "clipanion";

import LexCommand from "./commands/Lex";
import ParseCommand from "./commands/Parse";

export const NcStatCli = new Cli({
  binaryLabel: "Command line utility for @ncstat/parser",
  binaryName: "ncstat",
  binaryVersion: "1.0.0"
});

NcStatCli.register(LexCommand);
NcStatCli.register(ParseCommand);
