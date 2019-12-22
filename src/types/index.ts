import { Tool } from "../Tool";
import { Toolpath } from "../Toolpath";

export type VmcAxis = "X" | "Y" | "Z";
export type HmcAxis = VmcAxis | "B";

export type ToolInfo = [number, Tool];

export interface ProgramAnalysis {
  toolpaths: Toolpath[];
  extents: {
    X: { min: number; max: number };
    Y: { min: number; max: number };
    Z: { min: number; max: number };
    B: { min: number; max: number };
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
