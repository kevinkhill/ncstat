/**
 * `GROUP_02`
 */
export const enum PlaneSelectionCodes {
  G17 = "XY",
  G18 = "XZ",
  G19 = "YZ"
}

export type PLANE_SELECTION = "GROUP_02";
export type GROUP_02 = keyof typeof PlaneSelectionCodes;

/**
 * `GROUP_02`
 */
export const enum PlaneCombinations {
  XY = "G17",
  XZ = "G18",
  YZ = "G19"
}

/**
 * `GROUP_02`
 */
export type PlaneCombinationStrings = keyof typeof PlaneCombinations;
