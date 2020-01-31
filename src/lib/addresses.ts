import { filter, get, map } from "lodash/fp";

export const getValue = get("value");
export const getPrefix = get("prefix");
export const mapByValue = map("value");
export const mapByPrefix = map("prefix");
export const filterGcodes = filter({ prefix: "G" });
export const filterMcodes = filter({ prefix: "M" });

export function zeroPadAddress(input: string): string {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}
