import { IValueAddress } from "../types";

export class Address implements IValueAddress {
  public static factory(addr: string): Address {
    return new Address(addr);
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
