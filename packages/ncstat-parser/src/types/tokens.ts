import { NcToken } from "@/NcLexer";

export const enum Tokens {
  "EOF" = "EOF",
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

export interface NumericToken extends NcToken {
  value: number;
}

export interface StringToken extends NcToken {
  value: string;
}
