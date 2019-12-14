import { Block } from "./Block";
import { Point } from "./Point";

type MaybeNumber = number | undefined;

export const RETRACT_CODES = ["G98", "G99"];
export const START_CODES = [
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
  Z?: number;
  R?: number;
  F?: number;
  Q?: number;

  cycleCommand: string;
  retractCommand: string;

  private points: Point[] = [];

  constructor(block: Block) {
    this.Q = block.values.Q;
    this.Z = block.values.Z;
    this.R = block.values.R;
    this.F = block.values.F;

    this.cycleCommand = block.getCannedCycleStartCode();
    this.retractCommand = block.getRetractCode();
  }

  getPeck(): MaybeNumber {
    return this.Q;
  }

  getDepth(): MaybeNumber {
    return this.Z;
  }

  getRetract(): MaybeNumber {
    return this.R;
  }

  getFeedrate(): MaybeNumber {
    return this.F;
  }

  addPoint(point: Point | Block): void {
    this.points.push(point instanceof Block ? point.getPosition() : point);
  }

  getPoints(): Point[] {
    return this.points;
  }

  getPointCount(): number {
    return this.points.length;
  }
}
