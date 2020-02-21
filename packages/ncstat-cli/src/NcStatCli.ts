import { Cli } from "clipanion";

import { NcLexerCommand } from "./NcLexerCommand";
import { NcParserCommand } from "./NcParserCommand";

export const NcStatCli: Cli = new Cli({
  binaryLabel: "Command line utility for using the NcParser",
  binaryName: "ncstat",
  binaryVersion: "1.0.0"
});

NcStatCli.register(NcLexerCommand);
NcStatCli.register(NcParserCommand);
