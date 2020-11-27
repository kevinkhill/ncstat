export * from "./guards";
/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
export declare function zeroPadAddress(input: string): string;
/**
 * Pad a single digit number with zeros
 *
 * Defaults to 4 place because it just does for now
 *
 * @example zeroPad(1) // "1"
 */
export declare function zeroPad(input: number): string;
export declare function unwrap(str?: string): string;
export declare const debug: any;
export declare const makeDebugger: (namespace: string) => any;
//# sourceMappingURL=index.d.ts.map