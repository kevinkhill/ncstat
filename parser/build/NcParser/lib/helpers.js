"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitParse = exports.parseNumber = void 0;
function parseNumber(numberStr) {
    return numberStr.includes(".")
        ? parseFloat(numberStr)
        : parseInt(numberStr);
}
exports.parseNumber = parseNumber;
function splitParse(address) {
    return {
        prefix: address.substring(0, 1),
        value: parseNumber(address.substring(1))
    };
}
exports.splitParse = splitParse;
//# sourceMappingURL=helpers.js.map