/* eslint-disable @typescript-eslint/no-explicit-any */
import { Token } from "ts-tokenizr";

import { AddressToken } from "@/types";

import { NcToken } from "../NcToken";

function isNumeric(arg: any): boolean {
  return !isNaN(parseFloat(arg)) && isFinite(arg);
}

export function assertIsAddressToken(
  token: Token | AddressToken
): asserts token is AddressToken {
  return token.type !== "ADDR";
}

export function assertIsNumericToken(
  token: Token | AddressToken
): asserts token is NcToken & { value: number } {
  if (!isNumeric(token.type)) {
    throw Error("assertIsNumericToken");
  }
}
