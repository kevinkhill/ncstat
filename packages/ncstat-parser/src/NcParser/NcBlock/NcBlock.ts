import { intersection } from "lodash/fp";

import {
  filterByPrefix,
  findByPrefix,
  findByType,
  NcToken,
  prefixWith
} from "@/NcLexer";
import { CannedCycle } from "@/NcProgram";
import { CommentToken, NcPosition, Tokens } from "@/types";

export class NcBlock {
  readonly tags: string[] = [];
  readonly tokens: NcToken[] = [];

  static create(tokens: NcToken[]): NcBlock {
    return new NcBlock(tokens);
  }

  constructor(tokens: NcToken[]) {
    this.tokens = tokens;
  }

  $has(prefix: string): boolean {
    // console.log("has", this.tokens);
    return (
      this.tokens.filter(token => token.prefix === prefix).length > 0
    );
    // return filterByPrefix(prefix, this.tokens).length > 0;
  }

  $value(prefix: string): number | undefined {
    const token = findByPrefix(prefix, this.tokens);

    if (token) {
      return token.value as number;
    }

    return undefined;
  }

  toString(): string {
    return this.tokens.map(token => token.text).join(" ");
  }

  get length(): number {
    return this.tokens.length;
  }

  get position(): Partial<NcPosition> {
    return {
      X: this.X,
      Y: this.Y,
      Z: this.Z,
      B: this.B
    };
  }

  get tokenCount(): number | undefined {
    return this.tokens.length;
  }

  get lineNumber(): number | undefined {
    return this.N;
  }

  get hasComment(): boolean {
    return (
      this.tokens.find(token => token.isA(Tokens.COMMENT)) !== undefined
    );
  }

  get comment(): string | undefined {
    const token: CommentToken | undefined = findByType(
      Tokens.COMMENT,
      this.tokens
    );

    return token?.value;
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

    if (intersection(CannedCycle.START_CODES, this.G).length > 0) {
      return false;
    }

    return (
      typeof this.B !== "undefined" ||
      typeof this.X !== "undefined" ||
      typeof this.Y !== "undefined" ||
      typeof this.Z !== "undefined"
    );
  }

  get cannedCycleStartCode(): string | undefined {
    return intersection(
      CannedCycle.START_CODES.map(prefixWith("G")),
      this.tokens.map(token => token.text)
    )[0];
  }

  get isNline(): boolean {
    return this.$has("N");
  }

  get isStartOfCannedCycle(): boolean {
    return Boolean(this.cannedCycleStartCode);
  }

  get skipLevel(): number | undefined {
    return findByType(Tokens.BLK_SKIP, this.tokens).caseOf({
      Just: token => token.value as number,
      Nothing: () => undefined
    });
  }

  get A(): number | undefined {
    return this.$value("A");
  }

  get B(): number | undefined {
    return this.$value("B");
  }

  get C(): number | undefined {
    return this.$value("C");
  }

  get D(): number | undefined {
    return this.$value("D");
  }

  get E(): number | undefined {
    return this.$value("E");
  }

  get F(): number | undefined {
    return this.$value("F");
  }

  get G(): number[] {
    return filterByPrefix("G", this.tokens).map(
      token => token.value
    ) as number[];
  }

  get H(): number | undefined {
    return this.$value("H");
  }

  get I(): number | undefined {
    return this.$value("I");
  }

  get J(): number | undefined {
    return this.$value("J");
  }

  get K(): number | undefined {
    return this.$value("K");
  }

  get L(): number | undefined {
    return this.$value("L");
  }

  get M(): number | undefined {
    return this.$value("M");
  }

  get N(): number | undefined {
    return this.$value("N");
  }

  get O(): number | undefined {
    return this.$value("O");
  }

  get P(): number | undefined {
    return this.$value("P");
  }

  get Q(): number | undefined {
    return this.$value("Q");
  }

  get R(): number | undefined {
    return this.$value("R");
  }

  get S(): number | undefined {
    return this.$value("S");
  }

  get T(): number | undefined {
    return this.$value("T");
  }

  get U(): number | undefined {
    return this.$value("U");
  }

  get V(): number | undefined {
    return this.$value("V");
  }

  get W(): number | undefined {
    return this.$value("W");
  }

  get X(): number | undefined {
    return this.$value("X");
  }

  get Y(): number | undefined {
    return this.$value("Y");
  }

  get Z(): number | undefined {
    return this.$value("Z");
  }
}
