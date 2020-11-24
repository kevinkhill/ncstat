"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcToken = void 0;
const lib_1 = require("../lib");
const types_1 = require("../types");
const debug = lib_1.makeDebugger("lexer:token");
class NcToken {
    constructor(token) {
        this.type = token.type;
        this.value = token.value;
        this.text = token.text;
        this.pos = token.pos;
        this.line = token.line;
        this.column = token.column;
        if (token.type === types_1.Tokens.ADDRESS ||
            token.type === types_1.Tokens.PRG_NUMBER) {
            const value = token.value;
            this.prefix = value.prefix;
            this.value = parseFloat(value.value);
        }
        debug("%s %o", this.type, this.text);
    }
    static from(token) {
        return new NcToken(token);
    }
    toString() {
        const tokenAttr = [
            `type: ${this.type}`,
            `value: ${JSON.stringify(this.value)}`,
            `text: ${JSON.stringify(this.text)}`,
            `pos: ${this.pos}`,
            `line: ${this.line}`,
            `column: ${this.column}`
        ].join(", ");
        return `<${tokenAttr}>`;
    }
    isA(type, prefix) {
        if (type !== this.type) {
            return false;
        }
        if (prefix && prefix !== this.value) {
            return false;
        }
        return true;
    }
}
exports.NcToken = NcToken;
//# sourceMappingURL=NcToken.js.map