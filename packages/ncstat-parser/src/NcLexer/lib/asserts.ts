import { Token } from "ts-tokenizr";

import { AddressToken } from "@/types";

export function assertIsAddressToken(
  token: Token | AddressToken
): asserts token is AddressToken {
  return token.type !== "ADDR";
}
