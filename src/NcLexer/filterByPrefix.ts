import { curry, filter } from "lodash/fp";

import { NcToken } from "./types";

export function _filterByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken[] {
  return filter(token => {
    return token.value?.prefix === prefix;
  }, tokens);
}

export const filterByPrefix = curry(_filterByPrefix);
