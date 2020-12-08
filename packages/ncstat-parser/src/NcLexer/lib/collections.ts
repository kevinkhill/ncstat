import { prop } from "lodash/fp";

import { TokenTypes } from "../../types";
import { NcToken } from "../NcToken";

export const getType = prop("type");
export const getPrefix = prop("prefix");

export const prefixWith = (prefix: string) => (code: number): string =>
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

export function findByType(
  type: TokenTypes,
  tokens: NcToken[]
): NcToken | undefined {
  return tokens.find(token => token.isA(type));
}

export const getGcodes = filterByPrefix.bind(null, "G");
export const getMcodes = filterByPrefix.bind(null, "M");
