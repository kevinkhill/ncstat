import StateMachine from "javascript-state-machine";

export type Maybe<T> = T | undefined;

export interface Point {
  [K: string]: number | undefined;
}

export interface CannedPoint extends Point {
  I?: number;
  J?: number;
  K?: number;
  R: number;
  Q: number;
}

export interface NcCodeDef {
  COMMAND: string;
  GROUP: string;
}

export interface CannedCycle {
  cycleCommand: string;
  retractCommand: string;
}
