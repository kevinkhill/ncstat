import { getValue, NcToken } from "../NcLexer";

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
    const { prefix, value } = getValue(token);

    this.prefix = prefix;
    this.value = value;
  }

  toString(): string {
    return `${this.prefix}${this.value}`;
  }
}
