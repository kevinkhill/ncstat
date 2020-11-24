"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringToken = exports.isNumericToken = void 0;
// function isNumericValue(val: any): boolean {
//   return !isNaN(parseFloat(val)) && isFinite(val);
// }
function isNumericToken(token) {
    return typeof (token === null || token === void 0 ? void 0 : token.value) === "number";
}
exports.isNumericToken = isNumericToken;
function isStringToken(token) {
    return typeof (token === null || token === void 0 ? void 0 : token.value) === "string";
}
exports.isStringToken = isStringToken;
//# sourceMappingURL=type-predicates.js.map