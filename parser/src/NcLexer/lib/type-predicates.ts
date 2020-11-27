import { NumericToken, StringToken } from "../../types/tokens";
import { NcToken } from "../NcToken";

// function isNumericValue(val: any): boolean {
//   return !isNaN(parseFloat(val)) && isFinite(val);
// }

export function isNumericToken(token?: NcToken): token is NumericToken {
  return typeof token?.value === "number";
}

export function isStringToken(token?: NcToken): token is StringToken {
  return typeof token?.value === "string";
}
