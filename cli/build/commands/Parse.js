"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("@ncstat/parser");
const clipanion_1 = require("clipanion");
const readFile_1 = require("../lib/readFile");
class ParseCommand extends clipanion_1.Command {
    constructor() {
        super(...arguments);
        this.debug = false;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const parser = new parser_1.NcParser({ debug: this.debug });
            parser.on("error", (error) => {
                this.context.stderr.write(error.toString());
            });
            const program = parser.parse(yield readFile_1.readFile(this.filepath));
            this.writeOut(program);
        });
    }
    /**
     * Print the program to stdout, line by line.
     */
    writeOut(program) {
        let blockCount = 1;
        program.blocks.forEach((block) => {
            this.context.stdout.write("N" + ("0000" + blockCount).slice(-4) + ": ");
            this.context.stdout.write(`${block.toString()}\n`);
            blockCount++;
        });
        this.context.stdout.write(`\n Parsed ${blockCount} lines of NC code.\n\n`);
    }
}
__decorate([
    clipanion_1.Command.String({ required: true })
], ParseCommand.prototype, "filepath", void 0);
__decorate([
    clipanion_1.Command.Boolean(`-d,--debug`)
], ParseCommand.prototype, "debug", void 0);
__decorate([
    clipanion_1.Command.Path(`parse`),
    clipanion_1.Command.Path(``)
], ParseCommand.prototype, "execute", null);
exports.default = ParseCommand;
