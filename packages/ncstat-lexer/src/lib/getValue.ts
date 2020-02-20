import { NcToken, Address } from "../types";

/**
 * @TODO Class this?
 */
export function getValue(token: NcToken): Address {
  return {
    value: token.value.value,
    prefix: token.value.prefix
  };
}
