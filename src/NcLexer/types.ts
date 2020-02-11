import { IToken } from "tokenizr";

export type NcToken = IToken<any>;
export type NcTokens = NcToken[] | Generator<NcToken>;
export type LexerInput = string | string[] | Buffer;

export interface Address {
  value: number;
  prefix: string;
}
