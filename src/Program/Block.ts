import Debug from "debug";
import _ from "lodash";
import { extractors, zeroPadAddress } from "../lib";
import { CANNED_CYCLE_START_CODES } from "../NcCodes";
import { IPosition, IValueAddress } from "../types";
import { Address } from "./Address";

const debug = Debug("nc-scanner");

export class Block {
  public blockSkip: string | null = null;
  public readonly values: any = {};
  public A?: number;
  public B?: number;
  public C?: number;
  public D?: number;
  public E?: number;
  public F?: number;
  public H?: number;
  public I?: number;
  public J?: number;
  public K?: number;
  public L?: number;
  public N?: number;
  public O?: number;
  public P?: number;
  public Q?: number;
  public R?: number;
  public S?: number;
  public T?: number;
  public U?: number;
  public V?: number;
  public W?: number;
  public X?: number;
  public Y?: number;
  public Z?: number;

  private readonly addresses: IValueAddress[] = [];
  private readonly addressRegex: RegExp = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;
  private readonly comment: string | null = null;
  private readonly gCodes: number[] = [];
  private readonly mCodes: number[] = [];
  private readonly rawAddresses: string[] = [];
  private readonly rawLine: string = "";

  constructor(line: string) {
    this.rawLine = line;

    this.rawAddresses = this.rawLine.match(this.addressRegex);

    this.gCodes = _(this.rawAddresses)
      .filter(a => a.startsWith("G"))
      .map(a => parseInt(a.slice(1)))
      .value();

    this.mCodes = _(this.rawAddresses)
      .filter(a => a.startsWith("M"))
      .map(a => parseInt(a.slice(1)))
      .value();

    this.addresses = _.map(this.rawAddresses, Address.factory);

    _.forEach(_.keyBy(this.addresses, "prefix"), (v, k) => {
      this.values[k] = v.value;
    });

    _.forEach("ABCDEFHIJKLNOPQRSTUVWXYZ".split(""), ltr => {
      if (this.hasAddress(ltr)) {
        const value = this.getAddr(ltr).value;

        debug(`setting this.${ltr} to`, value);

        this[ltr] = value;
      }
    });

    this.mapAddressValuesToObj();

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
      B: this.getAddress("B"),
      X: this.getAddress("X"),
      Y: this.getAddress("Y"),
      Z: this.getAddress("Z")
    };
  }

  public getRetractCode(): string {
    return _(this.rawAddresses)
      .intersection(["G98", "G99"])
      .first();
  }

  public isStartOfCannedCycle(): boolean {
    const addresses = _(this.rawAddresses)
      .intersection(CANNED_CYCLE_START_CODES)
      .value();

    return addresses.length > 0;
  }

  public getCannedCycleStartCode(): string {
    return _(this.rawAddresses)
      .intersection(CANNED_CYCLE_START_CODES)
      .first();
  }

  public hasMovement(): boolean {
    if (_.difference(this.gCodes, [4, 10, 65])) {
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
    return _.some(this.addresses, ["ltr", ltr]);
  }

  public getAddress(addrPrefix: string): number | null {
    if (this.hasAddress(addrPrefix)) {
      return this.getAddr(addrPrefix).value;
    }

    return null;
  }

  public getAddr(addrPrefix: string): IValueAddress {
    if (this.hasAddress(addrPrefix)) {
      return _.find(this.addresses, ["prefix", addrPrefix]);
    }

    return {
      prefix: undefined,
      value: undefined
    } as IValueAddress;
  }

  public mapAddressValuesToObj() {
    // Map found G & M addresses to true on the block
    _.forEach(this.rawAddresses, addr => {
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
        this[ltr] = this.getAddr(ltr).value;
      }
    });
  }
}
