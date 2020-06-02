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
