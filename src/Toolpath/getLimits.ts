import { curry, filter, flow, get, map, max, min } from "lodash/fp";

import { dedupe } from "../lib/index";
import { AxisLimits, HmcAxis } from "../types";
import { Toolpath } from "./Toolpath";

export function _getLimits(
  axis: HmcAxis,
  toolpath: Toolpath
): AxisLimits {
  const getAxisValue = get(`values.${axis}`);
  const axisValueMap = map(getAxisValue);
  const onlyNumbers = filter(Boolean);
  const getUniqAxisValues = flow([dedupe, onlyNumbers, axisValueMap]);

  const axisValues = getUniqAxisValues(toolpath.blocks);

  return {
    axis,
    min: min(axisValues) as number,
    max: max(axisValues) as number
  };
}

export const getLimits = curry(_getLimits);
