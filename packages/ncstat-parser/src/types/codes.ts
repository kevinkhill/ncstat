export interface CodeDefinition {
  desc: string;
  group?: string;
}

export interface CodeTable {
  [K: string]: CodeDefinition;
}

export type PositioningMode = "G90" | "G91";
export type PlaneSelection = "G17" | "G18" | "G19";

export type MOTION_CODES = "GROUP_01";
export type PLANE_SELECTION = "GROUP_02";
export type POSITIONING_MODE = "GROUP_03";

export type VMC_AXES = "X" | "Y" | "Z";
export type HMC_AXES = VMC_AXES | "B";
