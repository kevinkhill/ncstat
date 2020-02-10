import { IToken } from "tokenizr";

export { tokenizeNc, getTokenGenerator } from "./tokens";

export type NcToken = IToken<any>;
export type LexerInput = string | string[] | Buffer;

export interface Address {
  value: number;
  prefix: string;
}

export function getValue(token: NcToken): Address {
  return {
    value: token.value.value,
    prefix: token.value.prefix
  };
}
