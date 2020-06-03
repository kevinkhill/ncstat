/**
 * `GROUP_03`
 */
export const enum PositioningModeCodes {
  G90 = "ABSOLUTE",
  G91 = "INCREMENTAL"
}

export type POSITIONING_MODE = "GROUP_03";
export type GROUP_03 = keyof typeof PositioningModeCodes;

/**
 * `GROUP_03`
 */
export const enum PositioningModes {
  ABSOLUTE = "G90",
  INCREMENTAL = "G91"
}

/**
 * `GROUP_03`
 */
export type PositioningModeStrings = keyof typeof PositioningModes;
