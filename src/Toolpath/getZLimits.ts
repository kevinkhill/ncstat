import { get, map, minBy } from "lodash/fp";

import { AxisLimits } from "../types";
import { getLimits, Toolpath } from ".";

export function getZLimits(toolpaths: Toolpath[]): AxisLimits {
  return minBy(
    get("min"),
    map(getLimits("Z"), toolpaths)
  ) as AxisLimits;
}
