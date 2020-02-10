import { find, map } from "lodash/fp";

import { addressValue, filterByPrefix, NcToken } from "../NcLexer";

export class NcBlock {
  static create(tokens: NcToken[]): NcBlock {
    return new NcBlock(tokens);
  }

  constructor(public tokens: NcToken[]) {
    this.tokens = tokens;
  }

  /* eslint-disable prettier/prettier */
  get A(): number {
    return this.$value("A");
  }
  get B(): number {
    return this.$value("B");
  }
  get C(): number {
    return this.$value("C");
  }
  get D(): number {
    return this.$value("D");
  }
  get E(): number {
    return this.$value("E");
  }
  get F(): number {
    return this.$value("F");
  }
  get G(): number[] {
    return map(addressValue, filterByPrefix("G", this.tokens));
  }
  get H(): number {
    return this.$value("H");
  }
  get I(): number {
    return this.$value("I");
  }
  get J(): number {
    return this.$value("J");
  }
  get K(): number {
    return this.$value("K");
  }
  get L(): number {
    return this.$value("L");
  }
  get M(): number {
    return this.$value("M");
  }
  get N(): number {
    return this.$value("N");
  }
  get O(): number {
    return this.$value("O");
  }
  get P(): number {
    return this.$value("P");
  }
  get Q(): number {
    return this.$value("Q");
  }
  get R(): number {
    return this.$value("R");
  }
  get S(): number {
    return this.$value("S");
  }
  get T(): number {
    return this.$value("T");
  }
  get U(): number {
    return this.$value("U");
  }
  get V(): number {
    return this.$value("V");
  }
  get W(): number {
    return this.$value("W");
  }
  get X(): number {
    return this.$value("X");
  }
  get Y(): number {
    return this.$value("Y");
  }
  get Z(): number {
    return this.$value("Z");
  }
  /* eslint-enable prettier/prettier */

  get skipLevel(): number {
    return find(["type", "BLK_SKIP"], this.tokens)?.value;
  }

  get comment(): string {
    return find(["type", "COMMENT"], this.tokens)?.value;
  }

  $value(prefix: string): number {
    if (this.$has(prefix)) {
      const token = filterByPrefix(prefix, this.tokens)[0];

      return addressValue(token);
    }

    return NaN;
  }

  $has(prefix: string): boolean {
    return filterByPrefix(prefix, this.tokens).length > 0;
  }

  toString(): string {
    return map("text", this.tokens).join(" ");
  }
}
