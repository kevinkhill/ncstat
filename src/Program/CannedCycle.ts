import * as _ from "lodash";

import { Block } from "./Block";
import { Point } from "./Point";

export const CANNED_CYCLE_DEFAULT_ARGS = ["Z", "R", "Q", "F"];

export const CANNED_CYCLE_START_CODES = [
  "G73",
  "G74",
  "G81",
  "G82",
  "G83",
  "G84",
  "G85",
  "G86",
  "G87"
];

export class CannedCycle {
  public G98?: any;
  public G99?: any;
  public peck: any;
  public depth: any;
  public retract: any;
  public feedrate: any;
  public cycleCommand: any;
  public retractCommand: any;

  private block: Block;
  private points: Point[] = [];

  constructor(block: Block) {
    this.block = block;

    this.peck = this.block.getAddress("Q");
    this.depth = this.block.getAddress("Z");
    this.retract = this.block.getAddress("R");
    this.feedrate = this.block.getAddress("F");

    this.cycleCommand = _.flatten(
      _.intersection(this.block.addresses, CANNED_CYCLE_START_CODES)
    );

    this.retractCommand = _.flatten(
      _.intersection(this.block.addresses, ["G98", "G99"])
    );

    this.G98 = this.block.addresses.indexOf("G98") > -1;
    this.G99 = this.block.addresses.indexOf("G99") > -1;

    CANNED_CYCLE_DEFAULT_ARGS.forEach(
      ltr => (this[ltr] = this.block.getAddress(ltr))
    );
  }

  public addPoint(point: Point): void {
    const position = point instanceof Block ? point.getPosition() : point;

    this.points.push(position);
  }

  public getPoints(): Point[] {
    return this.points;
  }

  public getPointCount(): number {
    return this.points.length;
  }
}
