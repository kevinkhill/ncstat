import { NcToken } from "@/types";

export function addressValue(token: NcToken): number {
  if (token.type === "ADDR") {
    return token.value.value;
  }

  return NaN;
}
