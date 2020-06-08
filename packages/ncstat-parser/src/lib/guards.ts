import { G_CODE } from "@/NcSpec";
import { ModalGroupStrings } from "@/types";

export function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw Error("Expected 'string', got ${typeof value}");
  }
}

export function isValidModalGroup(
  value: string
): value is ModalGroupStrings {
  assertString(value);

  return value in Object.keys(G_CODE);
}
