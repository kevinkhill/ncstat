import { Address } from "./Address";

export class Mcode extends Address {
  prefix = "M";

  constructor(value: number) {
    super("M", value);
  }

  get isPause(): boolean {
    return this.value === 0;
  }

  get isOpStop(): boolean {
    return this.value === 1;
  }

  get isEndOfProgram(): boolean {
    return this.value === 30;
  }

  toString(): string {
    return `M${this.value}`;
  }
}
