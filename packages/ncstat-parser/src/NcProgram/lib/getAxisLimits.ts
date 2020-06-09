import { filter, flow, map, max, min, path, uniq } from "lodash/fp";

import { AxisLimits, HmcAxis } from "@/types";

import { Toolpath } from "../Toolpath";

export function _getAxisLimits(
  axis: HmcAxis,
  toolpath: Toolpath
): AxisLimits {
  const getAxisValue = path(`values.${axis}`);
  const axisValueMap = map(getAxisValue);
  const onlyNumbers = filter(Boolean);
  const getUniqAxisValues = flow([onlyNumbers, uniq, axisValueMap]);

  const axisValues = getUniqAxisValues(toolpath.blocks);

  return {
    min: min(axisValues) as number,
    max: max(axisValues) as number
  };
}

export const getAxisLimits = (axis: HmcAxis) => (toolpath: Toolpath) =>
  _getAxisLimits(axis, toolpath);
