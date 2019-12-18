import { isNumber } from "lodash";
import { clone, each, find, first, has, intersection, map } from "lodash/fp";

import { Address } from "./Address";
import { RETRACT_CODES, START_CODES } from "./CannedCycle";
import {
  ADDRESS_REGEX,
  BLOCK_SKIP_REGEX,
  COMMENT_REGEX,
  getAddrVal,
  regexExtract,
  regexMatch
} from "./lib";
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

  readonly addresses: Address[] = [];

  private readonly comment?: string;
  private readonly blockSkip?: string;
  private readonly gCodes: number[] = [];
  private readonly mCodes: number[] = [];
  private readonly rawAddresses: string[] = [];

  get hasToolCall(): boolean {
    return this.hasAddress("T");
  }

  get hasToolChange(): boolean {
    return this.hasAddress("T") && this.hasAddress("M");
  }

  constructor(private readonly input: string) {
    this.rawAddresses = regexMatch(ADDRESS_REGEX, this.input);

    this.comment = regexExtract(COMMENT_REGEX, this.input);
    this.blockSkip = regexExtract(BLOCK_SKIP_REGEX, this.input);

    if (this.rawAddresses.length > 0) {
      this.addresses = map(Address.parse, this.rawAddresses);

      each(addr => {
        if (addr.isGcode()) {
          this.gCodes.push(addr.value as number);
        } else if (addr.isMcode()) {
          this.mCodes.push(addr.value as number);
        } else {
          this.values[addr.prefix] = addr.value as number;
        }
      }, this.addresses);
    }
  }

  G(code: number): boolean {
    return this.gCodes.includes(code);
  }

  M(code: number): boolean {
    return this.mCodes.includes(code);
  }

  getTool(): Tool | undefined {
    if (this.hasToolCall) {
      return Tool.fromBlock(this);
    }
  }

  getComment(): string | undefined {
    return this.comment;
  }

  getPosition(): Position {
    return {
      B: this.values.B,
      X: this.values.X,
      Y: this.values.Y,
      Z: this.values.Z
    };
  }

  // getRetractCode(): string {
  //   return first(intersection(map(getAddrVal, RETRACT_CODES), this.rawAddresses));
  // }

  // isStartOfCannedCycle(): boolean {
  //   const addresses = intersection(START_CODES, this.rawAddresses);

  //   return addresses.length > 0;
  // }

  // getCannedCycleStartCode(): string | undefined {
  //   return first(intersection(START_CODES, this.rawAddresses));
  // }

  hasMovement(): boolean {
    if (intersection(this.gCodes, [4, 10, 65]).length > 0) {
      return false;
    }

    return (
      isNumber(this.values.B) ||
      isNumber(this.values.X) ||
      isNumber(this.values.Y) ||
      isNumber(this.values.Z)
    );
  }

  hasAddress(addr: string): boolean {
    return has(addr, this.values);
  }

  hasCommand(mcode: number): boolean {
    return this.mCodes.includes(mcode);
  }

  getValue(prefix: string): number | undefined {
    if (this.hasAddress(prefix)) {
      return this.values[prefix];
    }
  }

  getAddress(prefix: string): Address | undefined {
    if (this.hasAddress(prefix)) {
      return find(["prefix", prefix], this.addresses);
    }
  }
}
