export const enum Modals {
  GROUP_00 = "NON_MODAL",
  NON_MODAL = "GROUP_00",

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

export const MODAL_GROUPS = {
  GROUP_01: "MOTION_CODES",
  GROUP_02: "PLANE_SELECTION",
  GROUP_03: "POSITIONING_MODE",
  MOTION_CODES: "GROUP_01",
  PLANE_SELECTION: "GROUP_02",
  POSITIONING_MODE: "GROUP_03"
};

// export const MODALS = {
//   MOTION: {
//     FEED: Modals.FEED,
//     RAPID: Modals.RAPID
//   },
//   PLANE_SELECTION: {
//     XY: Modals.XY,
//     XZ: Modals.XZ,
//     YZ: Modals.YZ
//   },
//   POSITIONING_MODE: {
//     ABSOLUTE: Modals.ABSOLUTE,
//     INCREMENTAL: Modals.INCREMENTAL
//   }
// };
