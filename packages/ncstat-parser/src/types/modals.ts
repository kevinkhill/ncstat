import { Modals } from "@/NcSpec";

export type MOTION_CODES =  keyof typeof Modals;
export type GROUP_01 = MOTION_CODES;

export type PLANE_SELECTION = Modals.XY | Modals.XZ | Modals.YZ;
export type GROUP_02 = PLANE_SELECTION;

export type POSITIONING_MODE = Modals.ABSOLUTE | Modals.INCREMENTAL;
export type GROUP_03 = POSITIONING_MODE;

export interface ActiveModals {
  // GROUP_00?: any;
  GROUP_01: MOTION_CODES;
  GROUP_02: PLANE_SELECTION;
  GROUP_03: POSITIONING_MODE;
};

// export type ModalCodeGroups = "GROUP_01"  | "GROUP_02"  | "GROUP_03"  | "GROUP_05"  | "GROUP_06"  | "GROUP_07"  | "GROUP_08"  | "GROUP_10"  | "GROUP_12";
