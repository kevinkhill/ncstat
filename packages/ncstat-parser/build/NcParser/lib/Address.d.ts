import { NcToken } from "../../NcLexer";
import { CodeDefinition } from "../../types";
import { Mcode } from "./Mcode";
export declare class Address {
    prefix: string;
    value: number;
    static fromString(address: string): Address | Mcode;
    static fromToken(token: NcToken): Address;
    constructor(prefix: string, value: number);
    get definition(): CodeDefinition;
    get isGcode(): boolean;
    get isMcode(): boolean;
    get isZero(): boolean;
    get isPositive(): boolean;
    get isNegative(): boolean;
    toString(): string;
}
//# sourceMappingURL=Address.d.ts.map