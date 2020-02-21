import { IToken } from "tokenizr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NcToken = IToken<any>;

export type TokenType =
  | "NEWLINE"
  | "PRG_DELIM"
  | "OPEN_BRACKET"
  | "CLOSE_BRACKET"
  | "PRG_NUMBER"
  | "ADDR"
  | "BLK_SKIP"
  | "COMMENT";

export interface LexerConfig {
  debug: boolean;
  newlineTokens: boolean;
}

export interface Address {
  value: number;
  prefix: string;
}
