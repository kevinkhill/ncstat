import { Token } from "ts-tokenizr";

import { AddressToken, Tokens } from "../../types";
import { NcToken } from "../NcToken";

function isNumeric(arg: string | number | unknown): boolean {
  return !isNaN(parseFloat(arg as string)) && isFinite(arg as number);
}

export function assertIsAddressToken(
  token: Token | AddressToken
): asserts token is AddressToken {
  if (token.type !== Tokens.ADDRESS) {
    throw Error("assertIsAddressToken");
  }
}

export function assertIsNumericToken(
  token: Token | AddressToken
): asserts token is NcToken & { value: number } {
  if (!isNumeric(token.value)) {
    throw Error("assertIsNumericToken");
  }
}
