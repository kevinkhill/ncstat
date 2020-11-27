import { Address } from "../NcParser";
import { CodeDefinition } from "../types";
export declare const stripPrefix: (input: string) => number;
export declare function getDefinition(address: Address): CodeDefinition;
/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineGCode("G10")  // "PROGRAMMABLE_OFFSET_INPUT"
 * ```
 */
export declare function defineGCode(input: string): CodeDefinition;
/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineMCode("M30") // "PROGRAM_END"
 * ```
 */
export declare function defineMCode(input: string): CodeDefinition;
/**
 * Return an M codes' definition
 *
 * @example ```
 *     define("G10")  // "PROGRAMMABLE_OFFSET_INPUT"
 *     define("M09") // "COOLANT_OFF"
 * ```
 */
export declare function define(input: string): CodeDefinition;
//# sourceMappingURL=lib.d.ts.map