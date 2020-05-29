import { NcToken } from "../NcToken";
import { TokenTypes } from "@/types";

export function filterByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken[] {
  return tokens.filter(token => token.prefix === prefix);
}

export function findByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken | undefined {
  return tokens.find(token => token.prefix === prefix);
}

export function findByType(
  type: TokenTypes,
  tokens: NcToken[]
): NcToken | undefined {
  return tokens.find(token => token.type === type);
}
