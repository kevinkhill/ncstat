export enum Modals {
  // GROUP_00 = "NON_MODAL",
  // NON_MODAL = "GROUP_00",

  GROUP_01 = "MOTION_CODES",
  MOTION_CODES = "GROUP_01",
  G00 = "RAPID",
  G01 = "FEED",
  RAPID = "G00",
  FEED = "G01",

  GROUP_02 = "PLANE_SELECTION",
  PLANE_SELECTION = "GROUP_02",
  G17 = "XY",
  G18 = "XZ",
  G19 = "YZ",
  XY = "G17",
  XZ = "G18",
  YZ = "G19",

  GROUP_03 = "POSITIONING_MODE",
  POSITIONING_MODE = "GROUP_03",
  G90 = "ABSOLUTE",
  G91 = "INCREMENTAL",
  ABSOLUTE = "G90",
  INCREMENTAL = "G91"
}
