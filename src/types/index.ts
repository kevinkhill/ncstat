export interface IPoint {
  X: number;
  Y: number;
  Z: number;
}

export interface IPosition extends IPoint {
  B: number;
}

export interface ICannedCycle {
  cycleCommand: string;
  retractCommand: string;
}
