import { IToken } from "tokenizr";

export type NcToken = IToken<any>;
export type NcTokens = NcToken[] | Generator<NcToken>;

export interface LexerConfig {
  debug: boolean
}

export interface Address {
  value: number;
  prefix: string;
}
