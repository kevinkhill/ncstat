import { } from "lodash/fp";

import { AxisLimits } from "@/types";

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
): NcToken | undefined {
  return tokens.find(token => token.prefix === prefix);
}

export function findByType(
  type: TokenType,
  tokens: NcToken[]
): NcToken | undefined {
  return tokens.find(token => token.type === type);
}
