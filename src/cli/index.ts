import { Cli } from "clipanion";

import { NcLexerCommand } from "./NcLexerCommand";
// import { GreetCommand } from "./GreetCommand";

export const cli = new Cli({
  binaryLabel: `NC Lexer`,
  binaryName: `ncstat`,
  binaryVersion: `1.0.0`
});

// cli.register(GreetCommand);
cli.register(NcLexerCommand);

cli.runExit(process.argv.slice(2), {
  stdin: process.stdin,
  stdout: process.stdout,
  stderr: process.stderr
});
