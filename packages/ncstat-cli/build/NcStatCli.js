"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcStatCli = void 0;

var _clipanion = require("clipanion");

var _NcLexerCommand = require("./NcLexerCommand");

var _NcParserCommand = require("./NcParserCommand");

const NcStatCli = new _clipanion.Cli({
  binaryLabel: "Command line utility for using the NcParser",
  binaryName: "ncstat",
  binaryVersion: "1.0.0"
});
exports.NcStatCli = NcStatCli;
NcStatCli.register(_NcLexerCommand.NcLexerCommand);
NcStatCli.register(_NcParserCommand.NcParserCommand);
