import { includes, join, split } from "lodash/fp";

export * from "./regex";
export * from "./addresses";
export * from "./constants";

export const hasDot = includes(".");
export const newlineJoin = join("\n");
export const newlineSplit = split("\n");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function isNumeric(input: string): boolean {
  if (typeof input === "number") {
    return input - input === 0;
  } else if (typeof input === "string" && input.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+input) : isFinite(+input);
  }

  return false;
}
