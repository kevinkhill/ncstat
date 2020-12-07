"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const clipanion_1 = require("clipanion");
const Lex_1 = __importDefault(require("./commands/Lex"));
const Parse_1 = __importDefault(require("./commands/Parse"));
exports.cli = new clipanion_1.Cli({
    binaryLabel: "Command line utility for @ncstat/parser",
    binaryName: "ncstat",
    binaryVersion: "1.0.0"
});
exports.cli.register(clipanion_1.Command.Entries.Help);
exports.cli.register(clipanion_1.Command.Entries.Version);
exports.cli.register(Lex_1.default);
exports.cli.register(Parse_1.default);
exports.cli.runExit(process.argv.slice(2), Object.assign({}, clipanion_1.Cli.defaultContext));
