import Debug from "debug";

export * from "./guards";

/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
export function zeroPadAddress(input: string): string {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}

/**
 * Pad a single digit number with zeros
 *
 * Defaults to 4 place because it just does for now
 *
 * @example zeroPad(1) // "1"
 */
export function zeroPad(input: number): string {
  return `0000${input}`.slice(-4);
}

export const debug = Debug("ncstat");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeDebugger = (namespace: string) =>
  debug.extend(namespace);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const makeDebuggers = (namespaces: string[]) =>
//   namespaces.map(ns => ({ [ns]: debug.extend(ns) }));
