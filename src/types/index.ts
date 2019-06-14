export interface IValueAddress {
  prefix: string;
  value: number;
}

export interface IPoint {
  X: number;
  Y: number;
  Z: number;
}

export interface ITool {
  desc: string;
  num: number;
}

export interface IPosition extends IPoint {
  B: number;
}

export interface ICannedCycle {
  cycleCommand: string;
  retractCommand: string;
}
