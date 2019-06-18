export interface IPoint {
  [K: string]: number;

  X: number;
  Y: number;
  Z: number;
}

export interface IPosition extends IPoint {
  B: number;
}

export interface INcCodeDef {
  COMMAND: string;
  GROUP: string;
}

export interface ICannedCycle {
  cycleCommand: string;
  retractCommand: string;
}

export interface IProgramStateMachine {
  is(state: string): boolean;
  startToolpath(): void;
  endToolpath(): void;
  endCannedCycle(): void;
  startCannedCycle(): void;
}
