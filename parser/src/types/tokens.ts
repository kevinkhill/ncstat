import { NcToken } from "../NcLexer";

export enum Tokens {
  "EOF" = "EOF",
  "M_CODE" = "M_CODE",
  "ADDRESS" = "ADDRESS",
  "COMMENT" = "COMMENT",
  "NEWLINE" = "NEWLINE",
  "BLK_SKIP" = "BLK_SKIP",
  "PRG_DELIM" = "PRG_DELIM",
  "PRG_NUMBER" = "PRG_NUMBER",
  "BRACKET_OPEN" = "BRACKET_OPEN",
  "BRACKET_CLOSE" = "BRACKET_CLOSE"
}

export type TokenTypes = keyof typeof Tokens;

export interface ParsedTokenizrValue {
  value: string;
  prefix: string;
}

export type TokenValue =
  | ParsedTokenizrValue
  | number
  | string
  | undefined;

// export interface

export interface GenericToken<T extends TokenTypes> extends NcToken {
  type: T;
}

export interface NumericToken extends NcToken {
  value: number;
}

export interface StringToken extends NcToken {
  value: string;
}

export interface CommentToken extends StringToken {
  type: Tokens.COMMENT;
}

export interface AddressToken extends NumericToken {
  type: Tokens.ADDRESS;
  prefix: string;
}

export interface MCodeToken extends NumericToken {
  type: Tokens.M_CODE;
  prefix: "M";
}
