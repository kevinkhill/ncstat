export class Address {
  prefix: string;
  value: number;

  static parse(valAddr: string): Address {
    return new Address(valAddr);
  }

  constructor(valAddr: string) {
    this.prefix = valAddr[0];
    this.value = valAddr.includes(".")
      ? parseFloat(valAddr.slice(1))
      : parseInt(valAddr.slice(1));
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
