import Debug from "debug";
import _ from "lodash";
import { extractors } from "../lib";
import { CANNED_CYCLE } from "../NcCodes";
import { IPosition } from "../types";
import Address from "./Address";

const log = Debug("nc-scanner");

export default class Block {
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
  public blockSkip: string | null = null;

  public readonly values: any = {};

  private readonly rawLine: string = "";
  private readonly gCodes: number[] = [];
  private readonly mCodes: number[] = [];
  private readonly addresses: Address[] = [];
  private readonly rawAddresses: string[] = [];
  private readonly comment: string | null = null;
  private readonly addressRegex: RegExp = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;

  constructor(line: string) {
    this.rawLine = line;

    this.rawAddresses = this.rawLine.match(this.addressRegex);

    // Map all found G codes to an integer array
    this.gCodes = _(this.rawAddresses)
      .filter(a => a.startsWith("G"))
      .map(a => parseInt(a.slice(1)))
      .value();

    // Map all found M codes to an integer array
    this.mCodes = _(this.rawAddresses)
      .filter(a => a.startsWith("M"))
      .map(a => parseInt(a.slice(1)))
      .value();

    // Create an array of `Addresses`
    this.addresses = _.map(this.rawAddresses, Address.factory);

    // Map all found letter addresses to `this.values`
    _.forEach(_.keyBy(this.addresses, "prefix"), (v, k) => {
      this.values[k] = v.value;
    });

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
    return _.some(this.addresses, ["prefix", ltr]);
  }

  public getAddress(addrPrefix: string): number | null {
    if (this.hasAddress(addrPrefix)) {
      return this.values[addrPrefix].value;
    }

    return null;
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
