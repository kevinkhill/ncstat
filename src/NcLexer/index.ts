import { reject } from "lodash/fp";

import { Address, NcToken } from "./types";

export * from "./tokens";
export * from "./types";

export const rejectNewline = reject(["type", "NEWLINE"]);

export function getValue(token: NcToken): Address {
  return {
    value: token.value.value,
    prefix: token.value.prefix
  };
}
