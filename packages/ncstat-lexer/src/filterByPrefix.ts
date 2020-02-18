import { filter, curry } from "lodash/fp";

import { NcToken } from "@ncstat/types";

export function _filterByPrefix(
  prefix: string,
  tokens: NcToken[]
): NcToken[] {
  return filter((token: NcToken) => {
    return token.value?.prefix === prefix;
  }, tokens);
}

export const filterByPrefix = curry(_filterByPrefix);
