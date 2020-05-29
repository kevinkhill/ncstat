import { HmcAxis } from ".";

interface UnitCount {
  count: number;
}

export type ProgramLimits = Record<HmcAxis, AxisLimits>;

export type AxisLimits = Record<
  HmcAxis,
  {
    min: number;
    max: number;
  }
>;

export interface ProgramStats {
  tokens: UnitCount;
  blocks: UnitCount;
  toolpaths: UnitCount;
  toolchanges: UnitCount;
  limits: ProgramLimits;
}
