import { NcToken } from "@/NcLexer";
import { Tokens } from "@/types";

export class Address {
  prefix: string;
  value: number;

  constructor(token: NcToken) {
    if (token.type !== Tokens.ADDRESS) {
      throw Error(`Token must be of type "ADDR"`);
    }

    this.prefix = token.value?.prefix;
    this.value = token.value?.value;
  }

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

  toString(): string {
    return `${this.prefix}${this.value}`;
  }
}
