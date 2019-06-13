import _ from "lodash";
import { CANNED_CYCLE_START_CODES } from "../NcCodes";
import { ICannedCycle } from "../types";
import { Block } from "./Block";
import { Point } from "./Point";

export class CannedCycle extends Block implements ICannedCycle {
  public Z: number;
  public R: number;
  public F: number;
  public Q: number;

  public cycleCommand: string;
  public retractCommand: string;

  private points: Point[] = [];

  constructor(line: string) {
    super(line);

    this.Q = this.getAddress("Q");
    this.Z = this.getAddress("Z");
    this.R = this.getAddress("R");
    this.F = this.getAddress("F");

    this.cycleCommand = this.getCannedCycleStartCode();
    this.retractCommand = this.getRetractCode();
  }

  get peck(): number {
    return this.Q;
  }

  get depth(): number {
    return this.Z;
  }

  get retract(): number {
    return this.R;
  }

  get feedrate(): number {
    return this.F;
  }

  public getRetractCode(): string {
    return _(this.rawAddresses)
      .intersection(["G98", "G99"])
      .first();
  }

  public getCannedCycleStartCode(): string {
    return _(this.rawAddresses)
      .intersection(CANNED_CYCLE_START_CODES)
      .first();
  }
  public addPoint(point: Point): CannedCycle {
    const position = point instanceof Block ? point.getPosition() : point;

    this.points.push(position);

    return this;
  }

  public getPoints(): Point[] {
    return this.points;
  }

  public getPointCount(): number {
    return this.points.length;
  }
}
