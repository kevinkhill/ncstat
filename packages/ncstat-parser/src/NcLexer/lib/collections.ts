import { List, Maybe } from "purify-ts";

import { TokenTypes } from "@/types";

import { NcToken } from "../NcToken";

export function filterByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken[] {
  return tokens.filter(token => token.prefix === prefix);
}

export function findByPrefix(
  prefix: string,
  tokens: NcToken[]
): Maybe<NcToken> {
  return List.find(token => token.prefix === prefix, tokens);
}

export function findByType(
  type: TokenTypes,
  tokens: NcToken[]
): Maybe<NcToken> {
  return List.find(token => token.type === type, tokens);
}
