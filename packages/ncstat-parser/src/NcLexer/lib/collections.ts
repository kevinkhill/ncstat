import { prop } from "lodash/fp";
import { List } from "purify-ts";

import { TokenTypes } from "@/types";

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
  return List.find(token => getPrefix(token) === prefix, tokens).caseOf(
    {
      Just: token => token,
      Nothing: () => undefined
    }
  );
}

export function findByType(
  type: TokenTypes,
  tokens: NcToken[]
): NcToken | undefined {
  return List.find(token => getType(token) === type, tokens).caseOf({
    Just: token => token,
    Nothing: () => undefined
  });
}
