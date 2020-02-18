import { reject } from "lodash/fp";

import { Address, NcToken } from "@ncstat/types";

export { NcLexer } from "./NcLexer";

export * from "./tokenMaps";
export * from "./filterByPrefix";

export const rejectNewline = reject(["type", "NEWLINE"]);

export function getValue(token: NcToken): Address {
  return {
    value: token.value.value,
    prefix: token.value.prefix
  };
}
