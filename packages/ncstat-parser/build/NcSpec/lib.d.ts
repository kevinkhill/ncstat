import { Address } from "../NcParser";
import { CodeDefinition } from "../types";
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
 * Return the definition for a G or M code
 *
 * @example ```
 *     getDefinition("G10") // "PROGRAMMABLE_OFFSET_INPUT"
 *     getDefinition("M09") // "COOLANT_OFF"
 * ```
 */
export declare function getDefinition(address: Address): CodeDefinition;
//# sourceMappingURL=lib.d.ts.map