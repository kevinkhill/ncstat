"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidModalGroups = exports.assertisValidModalGroups = exports.assertValidModalGroup = exports.isValidModalGroup = exports.isString = exports.isNumber = void 0;
const gcodes_1 = require("../NcSpec/gcodes");
function isNumber(x) {
    return typeof x === "number";
}
exports.isNumber = isNumber;
function isString(x) {
    return typeof x === "string";
}
exports.isString = isString;
function isValidModalGroup(value) {
    return gcodes_1.G_CODE_MODAL_GROUPS.includes(value);
}
exports.isValidModalGroup = isValidModalGroup;
function assertValidModalGroup(value) {
    if (!isValidModalGroup(value)) {
        const groups = gcodes_1.G_CODE_MODAL_GROUPS.join(" | ");
        throw Error(`Expected one of [ ${groups} ]", got ${value}"`);
    }
}
exports.assertValidModalGroup = assertValidModalGroup;
function assertisValidModalGroups(groups) {
    const isValidStringModalGroup = (value) => isString(value) && isValidModalGroup(value);
    return groups.every(isValidStringModalGroup);
}
exports.assertisValidModalGroups = assertisValidModalGroups;
function isValidModalGroups(groups) {
    const isValidStringModalGroup = (value) => isString(value) && isValidModalGroup(value);
    return groups.every(isValidStringModalGroup);
}
exports.isValidModalGroups = isValidModalGroups;
//# sourceMappingURL=guards.js.map