import { Modals } from "@/NcSpec";

export interface ModalGroups {
  [Modals.MOTION_CODES]: Modals.RAPID | Modals.FEED;
  [Modals.PLANE_SELECTION]: Modals.XY | Modals.XZ | Modals.YZ;
  [Modals.POSITIONING_MODE]: Modals.ABSOLUTE | Modals.INCREMENTAL;
}

export type ModalCodeGroups =
  | "GROUP_01"
  | "GROUP_02"
  | "GROUP_03"
  | "GROUP_05"
  | "GROUP_06"
  | "GROUP_07"
  | "GROUP_08"
  | "GROUP_10"
  | "GROUP_12";
