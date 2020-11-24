"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = exports.defineMCode = exports.defineGCode = exports.getDefinition = exports.stripPrefix = void 0;
const fanuc_1 = require("./fanuc");
const mcodes_1 = require("./mcodes");
const stripPrefix = (input) => parseInt(input.substring(1));
exports.stripPrefix = stripPrefix;
function getDefinition(address) {
    const lookupFn = address.prefix === "M" ? defineMCode : defineGCode;
    return lookupFn(address.toString());
}
exports.getDefinition = getDefinition;
/**
 * Helper method for creating {@link CodeDefinition}s
 */
function createDefinition(desc, group) {
    if (group) {
        return { desc, group };
    }
    return { desc };
}
/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineGCode("G10")  // "PROGRAMMABLE_OFFSET_INPUT"
 * ```
 */
function defineGCode(input) {
    var _a;
    return (_a = fanuc_1.G_CODE_TABLE[input]) !== null && _a !== void 0 ? _a : createDefinition("G_CODE_NOT_FOUND");
}
exports.defineGCode = defineGCode;
/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineMCode("M30") // "PROGRAM_END"
 * ```
 */
function defineMCode(input) {
    var _a;
    return (_a = mcodes_1.M_CODE_TABLE[input]) !== null && _a !== void 0 ? _a : createDefinition("M_CODE_NOT_FOUND");
}
exports.defineMCode = defineMCode;
/**
 * Return an M codes' definition
 *
 * @example ```
 *     define("G10")  // "PROGRAMMABLE_OFFSET_INPUT"
 *     define("M09") // "COOLANT_OFF"
 * ```
 */
function define(input) {
    if (input.startsWith("M")) {
        return defineMCode(input);
    }
    else if (input.startsWith("G")) {
        return defineGCode(input);
    }
    else {
        return createDefinition(`CODE_NOT_FOUND: ${input}`);
    }
}
exports.define = define;
//# sourceMappingURL=lib.js.map