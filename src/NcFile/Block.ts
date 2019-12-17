import { find, intersection, isNumber } from "lodash";
import { map } from "lodash/fp";

import { extractorFactory } from "../lib";
import { Maybe } from "../types";
import { regexExtract } from './../lib';
import { Address } from "./Address";
import { RETRACT_CODES, START_CODES } from "./CannedCycle";
import { RotatedPoint } from "./RotatedPoint";
import { Tool } from "./Tool";

export const ADDRESS_REGEX = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;

/**
 * Block Class
 *
 * Represents one line of NC code.
 */
export class Block {
  readonly values: {
    [K: string]: number;
  } = {};

  readonly blockSkip?: string;
  readonly addresses: Address[] = [];

  private readonly comment?: string;
  private readonly gCodes: number[] = [];
  private readonly mCodes: number[] = [];
  private readonly _addresses: Maybe<RegExpExecArray>;

  static parse(line: string): Block {
    return new Block(line);
  }

  get hasToolCall(): boolean {
    return this.hasAddress("T");
  }

  constructor(private readonly rawLine: string) {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const matches = ADDRESS_REGEX.exec(this.rawLine);

    if (matches) {
      this._addresses = matches;
      console.log(this._addresses);
      this.addresses = map(Address.factory, matches);

      // Map all found G & M codes to integer arrays
      this._addresses.forEach((a: string) => {
        const num = parseInt(a.slice(1));

        if (a.startsWith("G")) {
          this.gCodes.push(num);
        }

        if (a.startsWith("M")) {
          this.mCodes.push(num);
        }
      });

      // Map all found letter addresses to `this.values`
      this.addresses.forEach(address => {
        this.values[address.prefix] = address.value;
      });
    }

    this.comment = regexExtract(/\(\s?(.+)\s?\)/, this.rawLine);
    this.blockSkip = regexExtract(/(^\/[0-9]?)/, this.rawLine);
  }

  G(code: number): boolean {
    return this.gCodes.includes(code);
  }

  M(code: number): boolean {
    return this.mCodes.includes(code);
  }

  getTool(): Maybe<Tool> {
    if (this.hasToolCall) {
      return new Tool(this);
    }
  }

  getComment(): string {
    return this.comment || "";
  }

  getPosition(): RotatedPoint {
    return {
      B: this.values.B,
      X: this.values.X,
      Y: this.values.Y,
      Z: this.values.Z
    };
  }

  getRetractCode(): string {
    return intersection(this._addresses, RETRACT_CODES)[0];
  }

  isStartOfCannedCycle(): boolean {
    const addresses = intersection(this._addresses, START_CODES);

    return addresses.length > 0;
  }

  getCannedCycleStartCode(): string {
    return intersection(this._addresses, START_CODES)[0];
  }

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

  getValue(prefix: string): number | null {
    return this.hasAddress(prefix) ? this.values[prefix] : null;
  }

  getAddr(addrPrefix: string): Maybe<Address> {
    if (this.hasAddress(addrPrefix)) {
      return find(this.addresses, ["prefix", addrPrefix]);
    }
  }
}
