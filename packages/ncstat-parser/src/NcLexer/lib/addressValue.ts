import { Token } from "ts-tokenizr";

export function addressValue(token: Token): number {
  if (token.type === "ADDR") {
    return token?.value?.value;
  }

  return NaN;
}
