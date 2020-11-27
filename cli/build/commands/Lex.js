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
class LexCommand extends clipanion_1.Command {
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
            const lexer = parser.getLexer();
            try {
                const tokens = lexer.tokenize(yield readFile_1.readFile(this.filepath));
                for (const token of tokens) {
                    this.context.stdout.write(`${token}\n`);
                }
            }
            catch (err) {
                this.context.stderr.write(err.toString());
            }
        });
    }
}
__decorate([
    clipanion_1.Command.String({ required: true })
], LexCommand.prototype, "filepath", void 0);
__decorate([
    clipanion_1.Command.Boolean(`-d,--debug`)
], LexCommand.prototype, "debug", void 0);
__decorate([
    clipanion_1.Command.Path(`lex`)
], LexCommand.prototype, "execute", null);
exports.default = LexCommand;
