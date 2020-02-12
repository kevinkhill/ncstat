import { Linear } from "doublie";

import { NcBlock } from "NcBlock";

export type NcProgram = Linear<NcBlock>;

export type VmcAxis = "X" | "Y" | "Z";
export type HmcAxis = VmcAxis | "B";

export interface AxisLimits {
  axis: HmcAxis;
  min: number;
  max: number;
}

export type AxesLimits = Record<HmcAxis, AxisLimits>;

export type ExtractorFn = (subject: string) => string | undefined;

export interface Position {
  [K: string]: number;
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export interface MachinePositions {
  curr: Position;
  prev: Position;
}

// export interface CannedPoint extends Point {
//   I?: number;
//   J?: number;
//   K?: number;
//   R: number;
//   Q: number;
// }

export interface ActiveModals {
  GROUP_01: "G00" | "G01";
  GROUP_02: "G17" | "G18" | "G19";
  GROUP_03: "G90" | "G91";
}
