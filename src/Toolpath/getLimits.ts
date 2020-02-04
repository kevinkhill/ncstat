import {
  curry,
  each,
  filter,
  flow,
  get,
  keyBy,
  map,
  max,
  maxBy,
  min,
  minBy
} from "lodash/fp";

import { Program } from "../Program";
import { AxesLimits, AxisLimits, HmcAxis } from "../types";
import { getAxisLimits } from "./getAxisLimits";
import { Toolpath } from "./Toolpath";

export function _getLimits(
  axis: HmcAxis,
  toolp: Toolpath | Toolpath[]
): AxisLimits {
  const toolpaths: Toolpath[] = [];

  if (toolp instanceof Toolpath) {
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

// export function getProgramLimits(program: Program): AxesLimits {
//   const limits: AxesLimits = {};

//   VMC_AXES.forEach(axis => {
//     const a = axis as VmcAxis;
//     limits[a] = map(getLimits(a), program.toolpaths);
//   }

//   return  limits;
// }
