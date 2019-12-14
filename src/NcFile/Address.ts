import { isEqual } from "lodash-es";

export class Address {
  static factory(valAddr: string): Address {
    return new Address(valAddr);
  }

  prefix: string;
  value: number;

  constructor(valAddr: string) {
    this.prefix = valAddr[0];
    this.value = valAddr.includes(".")
      ? parseFloat(valAddr.slice(1))
      : parseInt(valAddr.slice(1));
  }

  toString(): string {
    return `${this.prefix}${this.value}`;
  }

  matches(valAddr: string): boolean {
    return isEqual(this, new Address(valAddr));
  }

  isPositive(): boolean {
    return this.value > 0;
  }

  isZero(): boolean {
    return this.value === 0;
  }

  isNegative(): boolean {
    return this.value < 0;
  }
}
