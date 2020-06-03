import { prop } from "lodash/fp";

import {
  AddressToken,
  CommentToken,
  GenericToken,
  Tokens,
  TokenTypes
} from "@/types";

import { NcToken } from "../NcToken";

export const getType = prop("type");
export const getPrefix = prop("prefix");

export const prefixWith = (prefix: string) => (code: number) =>
  `${prefix}${code}`;

export function filterByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken[] {
  return tokens.filter(token => getPrefix(token) === prefix);
}

export function findByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken | undefined {
  return tokens.find(token => getPrefix(token) === prefix);
}

export function findByType<T extends TokenTypes>(
  type: T,
  tokens: NcToken[]
): GenericToken<T> | undefined {
  const token = tokens.find(token => token.isA(type));

  return token;
}
