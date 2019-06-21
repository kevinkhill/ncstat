import { ICannedCycle } from "../types";
import Block from "./Block";
import Point from "./Point";

export default class CannedCycle implements ICannedCycle {
  public Z?: number;
  public R?: number;
  public F?: number;
  public Q?: number;

  public cycleCommand: string;
  public retractCommand: string;

  private points: Point[] = [];

  constructor(block: Block) {
    this.Q = block.values.Q;
    this.Z = block.values.Z;
    this.R = block.values.R;
    this.F = block.values.F;

    this.cycleCommand = block.getCannedCycleStartCode();
    this.retractCommand = block.getRetractCode();
  }

  public getPeck(): number {
    return this.Q;
  }

  public getDepth(): number {
    return this.Z;
  }

  public getRetract(): number {
    return this.R;
  }

  public getFeedrate(): number {
    return this.F;
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
