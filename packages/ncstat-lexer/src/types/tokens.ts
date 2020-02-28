import { IToken } from "tokenizr";

export interface NumericToken {
  value: number;
}

export interface StringToken {
  value: string;
}

export interface AddressToken extends NumericToken {
  type: "ADDR";
  prefix: string;
}

export interface ProgramDelimeterToken {
  value: "%";
}

export interface OpenBracketToken {
  value: "[";
}

export interface CloseBracketToken {
  value: "]";
}

export type TokenType =
  | "NEWLINE"
  | "PRG_DELIM"
  | "OPEN_BRACKET"
  | "CLOSE_BRACKET"
  | "PRG_NUMBER"
  | "ADDR"
  | "BLK_SKIP"
  | "COMMENT";

export type TokenizedValue =
  | NumericToken
  | StringToken
  | AddressToken
  | OpenBracketToken
  | CloseBracketToken
  | ProgramDelimeterToken;

export type ValueToken = IToken<TokenizedValue>;
