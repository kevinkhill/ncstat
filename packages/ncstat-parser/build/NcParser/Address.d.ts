import { NcToken } from "@ncstat/lexer";
/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
export declare function zeroPadAddress(input: string): string;
export declare class Address {
    prefix: string;
    value: number;
    constructor(token: NcToken);
    get isGcode(): boolean;
    get isMcode(): boolean;
    get isZero(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
    toString(): string;
}
//# sourceMappingURL=Address.d.ts.map