import { Tool } from "../Tool";

export type VmcAxis = "X" | "Y" | "Z";
export type HmcAxis = VmcAxis | "B";

export type ToolInfo = [number, Tool];

export interface Position {
  [K: string]: number;
}

// export interface CannedPoint extends Point {
//   I?: number;
//   J?: number;
//   K?: number;
//   R: number;
//   Q: number;
// }
