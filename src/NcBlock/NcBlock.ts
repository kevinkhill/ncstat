import { filter, find, intersection, map } from "lodash/fp";

import {
  addressValue,
  filterByPrefix,
  NcToken,
  tokenizeNc
} from "../NcLexer";
// import { RETRACT_CODES, START_CODES } from "../Toolpath/CannedCycle";
import { START_CODES } from "../Toolpath/CannedCycle";

export class NcBlock {
  static parse(input: string): NcBlock {
    const tokens = filter(token => {
      return token.type !== "NEWLINE" && token.type !== "EOF";
    }, tokenizeNc(input));

    return new NcBlock(tokens);
  }

  static create(tokens: NcToken[]): NcBlock {
    return new NcBlock(tokens);
  }

  [Symbol.iterator](): Iterator<NcToken> {
    return this.tokens.values();
  }

  constructor(public tokens: NcToken[]) {
    this.tokens = tokens;
  }

  $has(prefix: string): boolean {
    return filterByPrefix(prefix, this.tokens).length > 0;
  }

  $value(prefix: string): number {
    if (this.$has(prefix)) {
      const token = filterByPrefix(prefix, this.tokens)[0];

      return addressValue(token);
    }

    return NaN;
  }

  map(prop: string): string[] {
    return map(prop, this.tokens);
  }

  toString(): string {
    return this.map("text").join(" ");
  }

  get lineNumber(): number {
    return this.N;
  }

  get hasToolCall(): boolean {
    return this.$has("T");
  }

  get hasToolChange(): boolean {
    return this.M === 6;
  }

  get hasMovement(): boolean {
    if (intersection([4, 10, 65], this.G).length > 0) {
      return false;
    }

    return (
      typeof this.B === "number" ||
      typeof this.X === "number" ||
      typeof this.Y === "number" ||
      typeof this.Z === "number"
    );
  }

  get cannedCycleStartCode(): string | undefined {
    return intersection(START_CODES, this.map("text"))[0];
  }

  get isNline(): boolean {
    return this.$has("N");
  }

  get isStartOfCannedCycle(): boolean {
    return Boolean(this.cannedCycleStartCode);
  }

  get skipLevel(): number {
    return find(["type", "BLK_SKIP"], this.tokens)?.value;
  }

  get comment(): string {
    return find(["type", "COMMENT"], this.tokens)?.value;
  }

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
}
