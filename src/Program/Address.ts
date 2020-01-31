import _ from "lodash";

export default class Address {
  public static factory(valAddr: string): Address {
    return new Address(valAddr);
  }

  public prefix: string;
  public value: number;

  constructor(valAddr: string) {
    this.prefix = valAddr[0];
    this.value = valAddr.includes(".")
      ? parseFloat(valAddr.slice(1))
      : parseInt(valAddr.slice(1));
  }

  public toString(): string {
    return `${this.prefix}${this.value}`;
  }

  public matches(valAddr: string): boolean {
    return _.isEqual(this, new Address(valAddr));
  }

  public isPositive(): boolean {
    return this.value > 0;
  }

  public isZero(): boolean {
    return this.value === 0;
  }

  public isNegative(): boolean {
    return this.value < 0;
  }
}
