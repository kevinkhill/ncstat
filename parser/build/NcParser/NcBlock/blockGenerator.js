"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockGenerator = void 0;
const types_1 = require("../../types");
const NcBlock_1 = require("./NcBlock");
function* blockGenerator(tokens) {
    let lineTokens = [];
    for (const token of tokens) {
        if (token.type === types_1.Tokens.NEWLINE) {
            yield new NcBlock_1.NcBlock(lineTokens);
            lineTokens = [];
        }
        else {
            lineTokens.push(token);
        }
    }
}
exports.blockGenerator = blockGenerator;
//# sourceMappingURL=blockGenerator.js.map