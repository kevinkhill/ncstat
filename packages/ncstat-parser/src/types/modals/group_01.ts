/**
 * `GROUP_01`
 */
export const enum MotionStyleCodes {
  G00 = "RAPID",
  G01 = "FEED"
}

export type MOTION_CODES = "GROUP_01";

export type GROUP_01 = keyof typeof MotionStyleCodes;

/**
 * `GROUP_01`
 */
export const enum MotionStyles {
  RAPID = "G00",
  FEED = "G01"
}

/**
 * `GROUP_01`
 */
export type MotionStyleStrings = keyof typeof MotionStyles;
