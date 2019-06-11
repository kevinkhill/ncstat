import { flatten, intersection } from "lodash";

import { CANNED_CYCLE_START_CODES } from "../NcCodes";
import { Block } from "./Block";
import { Point } from "./Point";

export const CANNED_CYCLE_ARGS = ["Z", "R", "Q", "F"];

export class CannedCycle {
  public peck: any;
  public depth: any;
  public retract: any;
  public feedrate: any;

  public cycleCommand: any;
  public retractCommand: any;

  public G98?: any;
  public G99?: any;

  private points = [];
  private block: Block;

  constructor(block: Block) {
    this.block = block;
    this.points = [];

    this.peck = this.block.getAddress("Q");
    this.depth = this.block.getAddress("Z");
    this.retract = this.block.getAddress("R");
    this.feedrate = this.block.getAddress("F");

    this.cycleCommand = flatten(
      intersection(this.block.addresses, CANNED_CYCLE_START_CODES)
    );
    this.retractCommand = flatten(
      intersection(this.block.addresses, ["G98", "G99"])
    );

    this.G98 = this.block.addresses.indexOf("G98") > -1;
    this.G99 = this.block.addresses.indexOf("G99") > -1;

    CANNED_CYCLE_ARGS.forEach(ltr => {
      this[ltr] = this.block.getAddress(ltr);
    });
  }

  public addPoint(point: Point) {
    const position = point instanceof Block ? point.getPosition() : point;

    this.points.push(position);
  }

  public getPoints() {
    return this.points;
  }

  public getPointCount() {
    return this.points.length;
  }
}
