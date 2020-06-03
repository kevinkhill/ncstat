import { GROUP_01 } from "./group_01";
import { GROUP_02 } from "./group_02";
import { GROUP_03 } from "./group_03";

export * from "./group_01";
export * from "./group_02";
export * from "./group_03";

export interface ActiveModals {
  // GROUP_00?: any;
  GROUP_01: GROUP_01;
  GROUP_02: GROUP_02;
  GROUP_03: GROUP_03;
}

export const enum Modals {
  // Modal Type to Group Number
  NON_MODAL = "GROUP_00",
  MOTION_CODES = "GROUP_01",
  PLANE_SELECTION = "GROUP_02",
  POSITIONING_MODE = "GROUP_03",

  // Group Number to Modal Type
  GROUP_00 = "NON_MODAL",
  GROUP_01 = "MOTION_CODES",
  GROUP_02 = "PLANE_SELECTION",
  GROUP_03 = "POSITIONING_MODE"
}
