// export interface NcCodeDef {
//   COMMAND: string;
//   GROUP: string;
// }

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

export const enum Planes {
  XY = "G17",
  XZ = "G18",
  YZ = "G19"
}

export const enum Modals {
  RAPID = "G00",
  FEED = "G01",
  ABSOLUTE = "G90",
  INCREMENTAL = "G91",
  NON_MODAL = "GROUP_00",
  MOTION_CODES = "GROUP_01",
  PLANE_SELECTION = "GROUP_02",
  POSITIONING_MODE = "GROUP_03"
}
