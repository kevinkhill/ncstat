import StateMachine from "javascript-state-machine";

export type Maybe<T> = T | undefined;

export type VMCAxes = "X" | "Y" | "Z";
export type HMCAxes = VMCAxes | "B";

export interface Point {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export interface NcCodeDef {
  COMMAND: string;
  GROUP: string;
}

export interface CannedCycle {
  cycleCommand: string;
  retractCommand: string;
}

export interface ProgramStateMachine extends StateMachine {
  is(state: string): boolean;
  startToolpath(): void;
  endToolpath(): void;
  endCannedCycle(): void;
  startCannedCycle(): void;
}
