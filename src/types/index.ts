import { Tool } from "../Tool";
import { Toolpath } from "../Toolpath";

export type VmcAxis = "X" | "Y" | "Z";
export type HmcAxis = VmcAxis | "B";

export type ToolInfo = [number, Tool];

export type ExtractorFn = (subject: string) => string | undefined;

export interface ProgramAnalysis {
  toolpaths: Toolpath[];
  extents: {
    X: Partial<{ min: number; max: number }>;
    Y: Partial<{ min: number; max: number }>;
    Z: Partial<{ min: number; max: number }>;
    B: Partial<{ min: number; max: number }>;
  };
}

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
