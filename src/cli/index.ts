import { Cli } from "clipanion";

import { NcLexerCommand } from "./NcLexerCommand";
import { NcParserCommand } from "./NcParserCommand";

export const cli = new Cli({
  binaryLabel: `NC Static Analyzer`,
  binaryName: `ncstat`,
  binaryVersion: `1.0.0`
});

cli.register(NcLexerCommand);
cli.register(NcParserCommand);

cli.runExit(process.argv.slice(2), {
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr
});
