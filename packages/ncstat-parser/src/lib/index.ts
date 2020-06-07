import Debug from "debug";

/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
export function zeroPadAddress(input: string): string {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}

export const debug = Debug("ncstat");

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeDebugger = (namespace: string) =>
  debug.extend(namespace);
