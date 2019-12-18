import { isNumber } from "lodash";
import { clone, each, find, first, intersection, map } from "lodash/fp";

import { Address } from "@/Address";
import { RETRACT_CODES, START_CODES } from "@/CannedCycle";
import {
  ADDRESS_REGEX,
  BLOCK_SKIP_REGEX,
  COMMENT_REGEX,
  getAddrVal,
  regexExtract,
  regexMatch
} from "@/lib";
import { Tool } from "@/Tool";
import { Maybe, Position } from "@/types";

/**
 * Block Class
 *
 * Represents one line of NC code.
 */
export class Block {
  static parse(line: string): Block {
    return new Block(line);
  }

  readonly values: {
    [K: string]: number;
  } = {};

  readonly blockSkip?: string;
  readonly addresses: Address[] = [];

  private readonly comment?: string;
  private readonly gCodes: number[] = [];
  private readonly mCodes: number[] = [];
  private readonly _addresses: any[] = [];

  get hasToolCall(): boolean {
    return this.hasAddress("T");
  }

  get hasToolChange(): boolean {
    return this.hasAddress("T") && this.hasAddress("M");
  }

  constructor(private readonly input: string) {
    this._addresses = regexMatch(ADDRESS_REGEX, this.input);
    this.comment = regexExtract(COMMENT_REGEX, this.input);
    this.blockSkip = regexExtract(BLOCK_SKIP_REGEX, this.input);

    if (this._addresses.length > 0) {
      this.addresses = map(a => Address.parse(a.match), this._addresses);

      each(addr => {
        if (addr.isGcode()) {
          this.gCodes.push(addr.value);
        } else if (addr.isMcode()) {
          this.mCodes.push(addr.value);
        } else {
          this.values[addr.prefix] = addr.value;
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
  //   return first(intersection(map(getAddrVal, RETRACT_CODES), this._addresses));
  // }

  // isStartOfCannedCycle(): boolean {
  //   const addresses = intersection(START_CODES, this._addresses);

  //   return addresses.length > 0;
  // }

  // getCannedCycleStartCode(): string | undefined {
  //   return first(intersection(START_CODES, this._addresses));
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

  hasAddress(ltr: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.values, ltr);
  }

  hasCommand(mcode: number): boolean {
    return this.mCodes.includes(mcode);
  }

  getValue(prefix: string): number | null {
    return this.hasAddress(prefix) ? this.values[prefix] : null;
  }

  getAddr(addrPrefix: string): Maybe<Address> {
    if (this.hasAddress(addrPrefix)) {
      return find(["prefix", addrPrefix], this.addresses);
    }
  }
}
