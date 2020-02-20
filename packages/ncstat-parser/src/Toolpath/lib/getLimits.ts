import { get, map, maxBy, minBy } from "lodash/fp";

import { AxisLimits, HmcAxis } from "../../types";
import { Toolpath } from "../Toolpath";

import { getAxisLimits } from "./getAxisLimits";

export function _getLimits(
  axis: HmcAxis,
  toolp: Toolpath | Toolpath[]
): AxisLimits {
  const toolpaths: Toolpath[] = [];

  if (toolp instanceof Toolpath) {
    // eslint-disable-next-line no-param-reassign
    toolp = [toolp];
  }

  toolp.forEach(t => toolpaths.push(t));

  const allLimits = map(getAxisLimits(axis), toolpaths);

  return {
    axis,
    min: minBy(get("min"), allLimits)?.min ?? NaN,
    max: maxBy(get("max"), allLimits)?.max ?? NaN
  };
}

export const getLimits = (axis: HmcAxis) => (toolp: Toolpath | Toolpath[]) => _getLimits(axis, toolp);
