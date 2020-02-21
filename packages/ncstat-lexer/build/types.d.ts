import { IToken } from "tokenizr";
export declare type NcToken = IToken<any>;
export declare type TokenType = "NEWLINE" | "PRG_DELIM" | "OPEN_BRACKET" | "CLOSE_BRACKET" | "PRG_NUMBER" | "ADDR" | "BLK_SKIP" | "COMMENT";
export interface LexerConfig {
    debug: boolean;
    newlineTokens: boolean;
}
export interface Address {
    value: number;
    prefix: string;
}
//# sourceMappingURL=types.d.ts.map