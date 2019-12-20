import { filter } from "lodash/fp";

export * from "./regex";
export * from "./addresses";

export const filterEmptyLines = filter((l: string) => l.length > 0);

export function hasDot(input: string): boolean {
  return String.prototype.includes.call(input, ".");
}

export function isNumeric(input: string): boolean {
  if (typeof input === "number") {
    return input - input === 0;
  } else if (typeof input === "string" && input.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+input) : isFinite(+input);
  }
  return false;
}
