interface UnitCount {
  count: number;
}

export interface ProgramLimits {
  [K: string]: Record<string, AxisLimits>;
}

export interface AxisLimits {
  [K: string]: {
    min: number;
    max: number;
  };
}

export interface ProgramStats {
  tokens: UnitCount;
  blocks: UnitCount;
  toolpaths: UnitCount;
  toolchanges: UnitCount;
  limits: ProgramLimits;
}
