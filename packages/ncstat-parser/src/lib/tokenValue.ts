import { ValueToken } from "../types";

export function tokenValue(token: ValueToken): number | string {
  return token.value?.value ?? token.value;
}
