import { hasDot, isNumeric } from "./lib";

interface AddressDefinition {
  prefix: string;
  value: number;
}

export class Address {
  prefix: string;
  value: number;

  /**
   * @TODO how are we going to tackle variables... H#518
   * stripping # for now
   */
  static parse(input: string): Address {
    const prefix = input[0];
    const val = input.replace("#", "").substr(1);

    if (isNumeric(val) === false) {
      throw Error(
        `ERROR: Addresses must contain numeric value, failed to parse "${input}"`
      );
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
