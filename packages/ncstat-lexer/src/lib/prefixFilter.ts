import { filter } from "lodash/fp";

import { NcToken } from "../types";

export function prefixFilter(
  prefix: string,
  tokens: NcToken[]
): NcToken[] {
  return filter((token: NcToken) => {
    return token.value?.prefix === prefix;
  }, tokens);
}
