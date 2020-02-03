import {
  curry,
  filter,
  flow,
  get,
  keyBy,
  map,
  max,
  min,
  minBy
} from "lodash/fp";

import { Program } from "../Program";
import { AxesLimits, AxisLimits, HmcAxis, VmcAxis } from "../types";
import { VMC_AXES } from "./../lib/constants";
import { getAxisLimits } from "./getAxisLimits";
import { Toolpath } from "./Toolpath";

export function _getLimits(
  axis: HmcAxis,
  toolp: Toolpath | Toolpath[]
): AxisLimits {
  console.log(toolp);
  const toolpaths: Toolpath[] = [];

  if (toolp instanceof Toolpath) {
    toolpaths.push(toolp);
  } else {
    toolpaths.concat(toolp);
  }

  const allLimits = map(getAxisLimits(axis), toolpaths);

  console.log(toolpaths);

  return minBy(get("min"), allLimits) as AxisLimits;
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
