/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from "ts-tokenizr";

import { AddressToken, Tokens } from "@/types";

import { NcToken } from "../NcToken";

function isNumeric(arg: any): boolean {
  return !isNaN(parseFloat(arg)) && isFinite(arg);
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
