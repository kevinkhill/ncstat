export declare const M_CODES: Record<string, string>;
/**
 * Return an M codes' description by string or number
 *
 * @example ```
 *  M(30)             // => "PROGRAM_END"
 *  M("M6")           // => "TOOL_CHANGE"
 * ```
 */
export declare function M(input: number | string): string;
//# sourceMappingURL=mcodes.d.ts.map