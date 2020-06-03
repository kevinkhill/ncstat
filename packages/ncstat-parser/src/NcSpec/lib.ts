// import { forEach } from "lodash";

import { Maybe } from "purify-ts/Maybe";

import { CodeDefinition } from "@/types";

import { G_CODE_TABLE } from "./fanuc";
import { M_CODE_TABLE } from "./mcodes";

export const stripPrefix = (input: string): number =>
  parseInt(input.substring(1));

export function define(desc: string, group?: string): CodeDefinition {
  if (group) {
    return { desc, group };
  }

  return { desc };
}

/**
 * Return an M codes' definition
 *
 * @example ```
 *  gCode(10)  // "PROGRAMMABLE_OFFSET_INPUT"
 * ```
 */
export function defineGCode(input: number): CodeDefinition {
  return Maybe.fromFalsy(G_CODE_TABLE[input]).orDefault(
    define("M_CODE_NOT_FOUND")
  );
}

/**
 * Return an M codes' definition
 *
 * @example ```mCode(30) // "PROGRAM_END"```
 */
export function defineMCode(input: number): CodeDefinition {
  return Maybe.fromFalsy(M_CODE_TABLE[input]).orDefault(
    define("G_CODE_NOT_FOUND")
  );
}
