import { curry, get, map, maxBy, minBy } from "lodash/fp";

import { AxisLimits, HmcAxis } from "../types";
import { getAxisLimits } from "./getAxisLimits";
import { Toolpath } from "./Toolpath";

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

export const getLimits = curry(_getLimits);
