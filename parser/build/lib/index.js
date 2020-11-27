"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDebugger = exports.debug = exports.unwrap = exports.zeroPad = exports.zeroPadAddress = void 0;
const debug_1 = __importDefault(require("debug"));
__exportStar(require("./guards"), exports);
/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
function zeroPadAddress(input) {
    return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}
exports.zeroPadAddress = zeroPadAddress;
/**
 * Pad a single digit number with zeros
 *
 * Defaults to 4 place because it just does for now
 *
 * @example zeroPad(1) // "1"
 */
function zeroPad(input) {
    return `0000${input}`.slice(-4);
}
exports.zeroPad = zeroPad;
function unwrap(str) {
    if (typeof str !== "string") {
        throw Error("Remove parenthesis from a string");
    }
    return str.replace("(", "").replace(")", "").trim();
}
exports.unwrap = unwrap;
exports.debug = debug_1.default("ncstat");
const makeDebugger = (namespace) => exports.debug.extend(namespace);
exports.makeDebugger = makeDebugger;
//# sourceMappingURL=index.js.map