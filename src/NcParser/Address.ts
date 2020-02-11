import { getValue, NcToken } from "../NcLexer";

/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
export function zeroPadAddress(input: string): string {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}

export class Address {
  prefix: string;
  value: number;

  get isGcode(): boolean {
    return this.prefix === "G";
  }

  get isMcode(): boolean {
    return this.prefix === "M";
  }

  get isZero(): boolean {
    return this.value === 0;
  }

  get isPositive(): boolean {
    return this.value > 0;
  }

  get isNegative(): boolean {
    return this.value < 0;
  }

  constructor(token: NcToken) {
    this.prefix = token.value?.prefix;
    this.value = token.value?.value;
  }

  toString(): string {
    return `${this.prefix}${this.value}`;
  }
}
