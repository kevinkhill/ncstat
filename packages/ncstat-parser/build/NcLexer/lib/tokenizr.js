"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizr = void 0;
const ts_tokenizr_1 = require("ts-tokenizr");
const tokens_1 = require("../../types/tokens");
exports.tokenizr = new ts_tokenizr_1.Tokenizr();
// Match "%", required for proper NC files
exports.tokenizr.rule(/%/, (ctx) => ctx.accept(tokens_1.Tokens.PRG_DELIM));
// Match "["
exports.tokenizr.rule(/\[/, (ctx) => ctx.accept(tokens_1.Tokens.BRACKET_OPEN));
// Match "]"
exports.tokenizr.rule(/\]/, (ctx) => ctx.accept(tokens_1.Tokens.BRACKET_CLOSE));
// Match "\n" at end of a line
exports.tokenizr.rule(/\n/, (ctx) => ctx.accept(tokens_1.Tokens.NEWLINE));
// Match "O1234", "O12345", ":1234"
exports.tokenizr.rule(/(O|:)(\d{4,5})/, (ctx, match) => {
    ctx.accept(tokens_1.Tokens.PRG_NUMBER, {
        prefix: "O",
        value: parseInt(match[2])
    });
});
// Match "M5", "M01"
exports.tokenizr.rule(/M([\d]+)/, (ctx, match) => {
    ctx.accept(tokens_1.Tokens.M_CODE, {
        prefix: "M",
        value: parseInt(match[1])
    });
});
// Match "A1", "B2.0", "X41.2142"
exports.tokenizr.rule(/([A-LNP-Z])([#-]*[0-9.]+)(?![^(]*\))/, (ctx, match) => {
    ctx.accept(tokens_1.Tokens.ADDRESS, {
        prefix: match[1],
        value: parseFloat(match[2])
    });
});
// Match "/", "/3"
exports.tokenizr.rule(/\/([0-9]?)/, (ctx, match) => {
    ctx.accept(tokens_1.Tokens.BLK_SKIP, parseInt(match[1]));
});
// Match comment text "(note)", "( comment )"
exports.tokenizr.rule(/\(\s*(.+?)\s*\)/, (ctx, match) => {
    ctx.accept(tokens_1.Tokens.COMMENT, match[1]);
});
// Ignore " ", "<TAB>", "<CR>"
exports.tokenizr.rule(/[ \t\r]+/, (ctx) => ctx.ignore());
// tokenizr.rule(/\/\/[^\r\n]*\r?\n/, ctx => ctx.ignore());
//# sourceMappingURL=tokenizr.js.map