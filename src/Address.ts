import { hasDot, isNumeric } from "./lib";

interface AddressDefinition {
  prefix: string;
  value: number;
}

export class Address {
  prefix: string;
  value: number;

  static parse(input: string): Address {
    const prefix = input[0];
    const val = input.substr(1);

    if (isNumeric(val) === false) {
      throw Error("Addresses must contain numeric value.");
    }

    return new Address({
      prefix,
      value: hasDot(val) ? parseFloat(val) : parseInt(val)
    });
  }

  constructor({ prefix, value }: AddressDefinition) {
    this.prefix = prefix;
    this.value = value;
  }

  toString(): string {
    return `${this.prefix}${this.value}`;
  }

  isGcode(): boolean {
    return this.prefix === "G";
  }

  isMcode(): boolean {
    return this.prefix === "M";
  }

  isZero(): boolean {
    return this.value === 0;
  }

  isPositive(): boolean {
    return this.value > 0;
  }

  isNegative(): boolean {
    return this.value < 0;
  }

  isSameAs(valAddr: string): boolean {
    return (
      this.prefix === Address.parse(valAddr).prefix &&
      this.value === Address.parse(valAddr).value
    );
  }
}
