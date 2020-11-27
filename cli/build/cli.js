"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcStatCli = void 0;
const clipanion_1 = require("clipanion");
const commands_1 = require("./commands");
exports.NcStatCli = new clipanion_1.Cli({
    binaryLabel: "Command line utility for @ncstat/parser",
    binaryName: "ncstat",
    binaryVersion: "1.0.0"
});
exports.NcStatCli.register(commands_1.LexCommand);
exports.NcStatCli.register(commands_1.ParseCommand);
exports.NcStatCli.register(commands_1.DefaultCommand);
