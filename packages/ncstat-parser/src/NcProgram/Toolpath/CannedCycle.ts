import { NcBlock } from "../../NcParser/NcBlock";
import { Point } from "./Point";

interface CannedCycleConfig {
  Z: number;
  R: number;
  F: number;
  Q?: number;

  cycleCommand: string;
  retractCommand: string;
}

export class CannedCycle {
  static START_CODES = [73, 74, 81, 82, 83, 84, 85, 86, 87];
  static RETRACT_CODES = [98, 99];

  static fromBlock(block: NcBlock): CannedCycle {
    if (!block.isStartOfCannedCycle) {
      throw Error(
        "The provided Block is not the start of a CannedCycle."
      );
    }

    return new CannedCycle({
      Q: block.Q,
      Z: block.Z,
      R: block.R,
      F: block.F,
      retractCommand: block.retractCode as string,
      cycleCommand: block.cannedCycleStartCode as string
    });
  }

  Z: number;
  R: number;
  F: number;
  cycleCommand: string;
  retractCommand: string;

  Q?: number;
  I?: number;
  J?: number;
  K?: number;

  private points: Point[] = [];

  constructor(config: CannedCycleConfig) {
    this.Z = config.Z;
    this.R = config.R;
    this.F = config.F;
    this.cycleCommand = config.cycleCommand;
    this.retractCommand = config.retractCommand;

    this.Q = config?.Q;
  }

  getPeck(): number | undefined {
    return this.Q;
  }

  getDepth(): number | undefined {
    return this.Z;
  }

  getRetract(): number | undefined {
    return this.R;
  }

  getFeedrate(): number | undefined {
    return this.F;
  }

  addPoint(obj: Point): void {
    this.points.push(obj);
  }

  getPoints(): Point[] {
    return this.points;
  }

  getPointCount(): number {
    return this.points.length;
  }
}
