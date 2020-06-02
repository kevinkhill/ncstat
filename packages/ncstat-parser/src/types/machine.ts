// import { NcBlock } from "@/NcBlock";
// import { NcToken } from "@/NcLexer";

// export type NcBlocks = NcBlock[] | Generator<NcBlock>;
// export type Tokens = NcToken[] | Generator<NcToken>;

export interface ActiveModals {
  GROUP_01: "G00" | "G01";
  GROUP_02: "G17" | "G18" | "G19";
  GROUP_03: "G90" | "G91";
}

export interface NcPosition {
  // [K: string]: number;
  X: number;
  Y: number;
  Z: number;
  B: number;
}

// export interface CannedPoint extends Point {
//   I?: number;
//   J?: number;
//   K?: number;
//   R: number;
//   Q: number;
// }
