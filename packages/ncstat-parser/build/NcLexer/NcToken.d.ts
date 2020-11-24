import { Token } from "ts-tokenizr";
import { TokenTypes, TokenValue } from "../types";
export declare class NcToken {
    type: TokenTypes;
    text: string;
    pos: number;
    line: number;
    column: number;
    value: TokenValue;
    prefix?: string;
    static from(token: Token): NcToken;
    constructor(token: Token);
    toString(): string;
    isA(type: TokenTypes, prefix?: string): boolean;
}
//# sourceMappingURL=NcToken.d.ts.map