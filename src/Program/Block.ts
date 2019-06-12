import * as _ from "lodash";
import { IPosition } from "../types";
import { CANNED_CYCLE_START_CODES } from "./CannedCycle";

const debug = require("debug")("nc-scanner Block");
const blockSkipRegex: RegExp = /(^\/[0-9]?)/;
const commentRegex: RegExp = /\(\s?(.+)\s?\)/;
const addressRegex: RegExp = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;

function zeroPadAddress(str: string): string {
  return str ? str[0] + `00${str.slice(1)}`.slice(-2) : "";
}

export class Block {
  public G00?: boolean;
  public G01?: boolean;
  public G04?: boolean;
  public G10?: boolean;
  public G65?: boolean;
  public G80?: boolean;
  public G90?: boolean;
  public G91?: boolean;
  public G98?: boolean;
  public G99?: boolean;

  public B?: number;
  public O?: number;
  public X?: number;
  public Y?: number;
  public Z?: number;
  public comment: string | null = null;
  public blockSkip: string | null = null;
  // public addresses: IAddress[] = [];
  public addresses: string[] = [];

  private gCodes = [];
  private readonly rawLine: string = "";

  constructor(line: any) {
    this.rawLine = line;

    this.addresses = this.rawLine.match(addressRegex);

    this.gCodes = _.filter(this.addresses, a => a.startsWith("G"));
    this.gCodes = _.map(this.gCodes, addr => parseInt(addr.slice(1)));

    // debug(this.gCodes);

    this.mapAddressValuesToObj();

    if (blockSkipRegex.test(this.rawLine)) {
      const match = this.rawLine.match(blockSkipRegex);

      if (match) {
        this.blockSkip = match[1];
      }
    }

    if (commentRegex.test(this.rawLine)) {
      const match = this.rawLine.match(commentRegex);

      if (match) {
        this.comment = match[1];
      }
    }
  }

  public G(code) {
    return this.gCodes.includes(code);
  }

  public getPosition(): IPosition {
    return {
      B: this.getAddress("B"),
      X: this.getAddress("X"),
      Y: this.getAddress("Y"),
      Z: this.getAddress("Z")
    };
  }

  public isStartOfCannedCycle(): boolean {
    return this.getCannedCycleStartCode() != null;
  }

  public hasMovement(): boolean {
    if (this.G10 === true || this.G04 === true || this.G65 === true) {
      return false;
    }

    return (
      _.isNumber(this.B) ||
      _.isNumber(this.X) ||
      _.isNumber(this.Y) ||
      _.isNumber(this.Z)
    );
  }

  public hasAddress(ltr: string): boolean {
    return _.find(this.addresses, address => address[0] === ltr) !== undefined;
  }

  public getAddress(ltr: string): number {
    if (this.hasAddress(ltr)) {
      const code = _.find(this.addresses, address => address[0] === ltr);

      const value = code.slice(1);

      return code.indexOf(".") > -1 ? parseFloat(value) : parseInt(value);
    }

    return null;
  }

  public getCannedCycleStartCode() {
    const cycle = _.intersection(this.addresses, CANNED_CYCLE_START_CODES);

    return cycle.length > 0 ? cycle[0] : null;
  }

  public mapAddressValuesToObj() {
    // Map found G & M addresses to true on the block
    _.forEach(this.addresses, addr => {
      if (addr[0] === "G" || addr[0] === "M") {
        if (parseInt(addr.slice(1)) < 10) {
          this[zeroPadAddress(addr)] = true;
        } else {
          this[addr] = true;
        }
      }
    });

    // Map all found Letter addresses to their cast values on the block
    _.forEach("ABCDEFHIJKLNOPQRSTUVWXYZ".split(""), ltr => {
      if (this.hasAddress(ltr)) {
        this[ltr] = this.getAddress(ltr);
      }
    });
  }
}
