import Debug from "debug";
import _ from "lodash";
import { extractors } from "../lib";
import { CANNED_CYCLE } from "../NcCodes";
import { IPosition } from "../types";
import Address from "./Address";

const log = Debug("nc-scanner");

/**
 * Block Class
 *
 * Represents one line of NC code.
 */
export default class Block {
  public readonly values: {
    [K: string]: number;
  } = {};
  public readonly blockSkip: string | null = null;

  private readonly gCodes: number[] = [];
  private readonly mCodes: number[] = [];
  private readonly addresses: Address[] = [];
  private readonly rawAddresses: string[] = [];
  private readonly comment: string | null = null;
  private readonly addressRegex: RegExp = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;

  constructor(private readonly rawLine: string) {
    this.rawAddresses = this.rawLine.match(this.addressRegex);

    if (this.rawAddresses) {
      this.addresses = this.rawAddresses.map(Address.factory);

      // Map all found G & M codes to integer arrays
      this.rawAddresses.forEach((a: string) => {
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

    this.comment = extractors.commentExtractor(this.rawLine);
    this.blockSkip = extractors.blockSkipExtractor(this.rawLine);
  }

  public G(code: number): boolean {
    return this.gCodes.includes(code);
  }

  public M(code: number): boolean {
    return this.mCodes.includes(code);
  }

  public getComment(): string {
    return this.comment;
  }

  public getPosition(): IPosition {
    return {
      B: this.values.B,
      X: this.values.X,
      Y: this.values.Y,
      Z: this.values.Z
    };
  }

  public getRetractCode(): string {
    return _(this.rawAddresses)
      .intersection(CANNED_CYCLE.RETRACT_CODES)
      .first();
  }

  public isStartOfCannedCycle(): boolean {
    const addresses = _(this.rawAddresses)
      .intersection(CANNED_CYCLE.START_CODES)
      .value();

    return addresses.length > 0;
  }

  public getCannedCycleStartCode(): string {
    return _(this.rawAddresses)
      .intersection(CANNED_CYCLE.START_CODES)
      .first();
  }

  public hasMovement(): boolean {
    if (_.intersection(this.gCodes, [4, 10, 65]).length > 0) {
      return false;
    }

    return (
      _.isNumber(this.values.B) ||
      _.isNumber(this.values.X) ||
      _.isNumber(this.values.Y) ||
      _.isNumber(this.values.Z)
    );
  }

  public hasAddress(ltr: string): boolean {
    return this.values.hasOwnProperty(ltr);
  }

  public getValue(prefix: string): number | null {
    return this.hasAddress(prefix) ? this.values[prefix] : null;
  }

  public getAddr(addrPrefix: string): Address {
    if (this.hasAddress(addrPrefix)) {
      return _.find(this.addresses, ["prefix", addrPrefix]);
    }

    return {
      prefix: undefined,
      value: undefined
    } as Address;
  }
}
