"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMcodes = exports.getGcodes = exports.findByType = exports.findByPrefix = exports.filterByPrefix = exports.prefixWith = exports.getPrefix = exports.getType = void 0;
const fp_1 = require("lodash/fp");
exports.getType = fp_1.prop("type");
exports.getPrefix = fp_1.prop("prefix");
const prefixWith = (prefix) => (code) => `${prefix}${code}`;
exports.prefixWith = prefixWith;
function filterByPrefix(prefix, tokens) {
    return tokens.filter((token) => exports.getPrefix(token) === prefix);
}
exports.filterByPrefix = filterByPrefix;
function findByPrefix(prefix, tokens) {
    return tokens.find((token) => exports.getPrefix(token) === prefix);
}
exports.findByPrefix = findByPrefix;
function findByType(type, tokens) {
    return tokens.find((token) => token.isA(type));
}
exports.findByType = findByType;
exports.getGcodes = filterByPrefix.bind(null, "G");
exports.getMcodes = filterByPrefix.bind(null, "M");
//# sourceMappingURL=collections.js.map