import { IToken } from "tokenizr";
export declare type NcToken = IToken<any>;
export declare type NcTokens = NcToken[] | Generator<NcToken>;
export interface LexerConfig {
    debug: boolean;
}
export interface Address {
    value: number;
    prefix: string;
}
//# sourceMappingURL=types.d.ts.map