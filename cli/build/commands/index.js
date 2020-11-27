"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCommand = exports.LexCommand = exports.DefaultCommand = void 0;
const Lex_1 = __importDefault(require("./Lex"));
exports.LexCommand = Lex_1.default;
const Parse_1 = __importDefault(require("./Parse"));
exports.ParseCommand = Parse_1.default;
const Default_1 = __importDefault(require("./Default"));
exports.DefaultCommand = Default_1.default;
