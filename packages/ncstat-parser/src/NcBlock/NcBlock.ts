import { intersection } from "lodash/fp";
import { Maybe } from "purify-ts/Maybe";
import { Token } from "ts-tokenizr";

import {
  filterByPrefix,
  findByPrefix,
  findByType,
  NcToken
} from "@/NcLexer";
import { isStringToken } from "@/NcLexer/lib";
import { START_CODES } from "@/Toolpath/CannedCycle";
import { Position } from "@/types";
import { Tokens } from "@/types/tokens";

export class NcBlock {
  retractCode?: string;
  tokens: NcToken[];

  static create(tokens: NcToken[]): NcBlock {
    return new NcBlock(tokens);
  }

  // @TODO convert this to a getter
  getPosition(): Position {
    return {
      B: this.B,
      X: this.X,
      Y: this.Y,
      Z: this.Z
    };
  }

  constructor(tokens: NcToken[]) {
    this.tokens = tokens;
  }

  $has(prefix: string): boolean {
    return filterByPrefix(prefix, this.tokens).length > 0;
  }

  $value(prefix: string): number {
    return Maybe.fromFalsy(findByPrefix(prefix, this.tokens))
      .map(token => token.value as number)
      .orDefault(NaN);
  }

  map<U>(
    fn: (value: Token, index: number, array: Token[]) => U,
    thisArg?: unknown
  ): U[] {
    return this.tokens.map(fn, thisArg);
  }

  toString(): string {
    return this.map(token => token.text).join(" ");
  }

  get tokenCount(): number {
    return this.tokens.length;
  }

  get lineNumber(): number {
    return this.N;
  }

  get hasToolCall(): boolean {
    return this.$has("T");
  }

  // @TODO configurable toolchange codes
  get hasToolChange(): boolean {
    return this.M === 6;
  }

  get hasMovement(): boolean {
    // @TODO Manage this conflict with G code groups
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
    return intersection(
      START_CODES,
      this.map(token => token.text)
    )[0];
  }

  get isNline(): boolean {
    return this.$has("N");
  }

  get isStartOfCannedCycle(): boolean {
    return Boolean(this.cannedCycleStartCode);
  }

  get skipLevel(): number {
    return Maybe.fromFalsy(findByType("BLK_SKIP", this.tokens))
      .map(token => token.value as number)
      .orDefault(NaN);
  }

  get comment(): string | undefined {
    const token = findByType(Tokens.COMMENT, this.tokens);

    return isStringToken(token) ? token.value : undefined;
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
    return filterByPrefix("G", this.tokens).map(
      token => token.value
    ) as number[];
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
