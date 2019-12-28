import {
  each,
  find,
  get,
  includes,
  intersection,
  join,
  map
} from "lodash/fp";

import { Address } from "./Address";
import { RETRACT_CODES, START_CODES } from "./CannedCycle";
import {
  ADDRESS_REGEX,
  BLOCK_SKIP_REGEX,
  COMMENT_REGEX,
  filterGcodes,
  filterMcodes,
  mapByValue,
  regexExtract,
  regexMatch
} from "./lib";
import { Point } from "./Point";
import { Tool } from "./Tool";
import { Position } from "./types";

/**
 * A Block represents one line of NC code.
 */
export class Block {
  static parse(line: string): Block {
    return new Block(line);
  }

  readonly values: {
    [K: string]: number;
  } = {};

  readonly N?: number;
  readonly comment?: string;
  readonly blockSkip?: number;
  readonly gCodes: number[] = [];
  readonly mCodes: number[] = [];
  readonly addresses: Address[] = [];

  private readonly rawAddresses: string[] = [];

  get lineNumber(): number {
    return this.values.N;
  }

  get hasToolCall(): boolean {
    return this.hasAddress("T");
  }

  get hasToolChange(): boolean {
    return this.rawAddresses.includes("M6");
  }

  get cannedCycleStartCode(): string | undefined {
    return intersection(START_CODES, this.rawAddresses)[0];
  }

  get isStartOfCannedCycle(): boolean {
    return Boolean(this.cannedCycleStartCode);
  }

  /**
   * Create a new {@link Block} from a line of NC code.
   */
  constructor(readonly rawInput: string) {
    this.rawAddresses = regexMatch(ADDRESS_REGEX, this.rawInput);

    const comment = regexExtract(COMMENT_REGEX, this.rawInput);

    if (comment) {
      this.comment = comment.trim();
    }

    const blockSkip = regexExtract(BLOCK_SKIP_REGEX, this.rawInput);

    if (blockSkip) {
      this.blockSkip = parseInt(blockSkip);
    }

    if (this.rawAddresses.length > 0) {
      this.addresses = map(Address.parse, this.rawAddresses);

      this.gCodes = mapByValue(filterGcodes(this.addresses));

      /**
       * @TODO I think this should be singular
       */
      this.mCodes = mapByValue(filterMcodes(this.addresses));

      each(a => {
        if (a.prefix !== "G" && a.prefix !== "M")
          this.values[a.prefix] = a.value;
      }, this.addresses);
    }
  }

  toString(): string {
    return join(" ", this.rawAddresses);
  }

  G(code: number): boolean {
    return this.gCodes.includes(code);
  }

  M(code: number): boolean {
    return this.mCodes.includes(code);
  }

  has(address: string): boolean {
    return this.rawAddresses.includes(address);
  }

  hasCommand(mcode: number): boolean {
    return this.mCodes.includes(mcode);
  }

  getPoint(): Point {
    return Point.fromBlock(this);
  }

  getTool(): Tool | undefined {
    if (this.hasToolCall) {
      return Tool.fromBlock(this);
    }

    throw Error("ERROR: The block does not contain Txx");
  }

  getPosition(): Position {
    return {
      B: this.values.B,
      X: this.values.X,
      Y: this.values.Y,
      Z: this.values.Z
    };
  }

  getRetract(): Address {
    const match = intersection(RETRACT_CODES, this.rawAddresses);

    if (match.length > 1) {
      throw Error("Duplicate codes from the same code group found.");
    }

    return Address.parse(match[0]);
  }

  getRetractCode(): string {
    return this.getRetract().toString();
  }

  hasMovement(): boolean {
    if (intersection([4, 10, 65], this.gCodes).length > 0) {
      return false;
    }

    return (
      typeof this.values.B === "number" ||
      typeof this.values.X === "number" ||
      typeof this.values.Y === "number" ||
      typeof this.values.Z === "number"
    );
  }

  hasAddress(addr: string): boolean {
    return includes(addr, map(get("prefix"), this.addresses));
  }

  getAddress(prefix: string): Address | undefined {
    if (this.hasAddress(prefix) === false) {
      throw Error(
        `The address [${prefix}xx] is not present in the Block.`
      );
    }

    return find(["prefix", prefix], this.addresses);
  }

  getValue(prefix: string): number | undefined {
    if (this.hasAddress(prefix) === false) {
      throw Error(
        `The address [${prefix}xx] is not present in the Block.`
      );
    }

    return get("value", this.getAddress(prefix));
  }
}
