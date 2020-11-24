"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsNumericToken = exports.assertIsAddressToken = void 0;
const types_1 = require("../../types");
function isNumeric(arg) {
    return !isNaN(parseFloat(arg)) && isFinite(arg);
}
function assertIsAddressToken(token) {
    if (token.type !== types_1.Tokens.ADDRESS) {
        throw Error("assertIsAddressToken");
    }
}
exports.assertIsAddressToken = assertIsAddressToken;
function assertIsNumericToken(token) {
    if (!isNumeric(token.value)) {
        throw Error("assertIsNumericToken");
    }
}
exports.assertIsNumericToken = assertIsNumericToken;
//# sourceMappingURL=asserts.js.map