import { filter, flow, map, max, min, path } from "lodash/fp";

import { AxisLimits, HmcAxis } from "../../types";
import { Toolpath } from "../Toolpath";

export function dedupe<T>(arr: Array<T>): Array<T> {
  return Array.from(new Set(arr));
}

export function _getAxisLimits(
  axis: HmcAxis,
  toolpaths: Toolpath
): AxisLimits {
  const getAxisValue = path(`values.${axis}`);
  const axisValueMap = map(getAxisValue);
  const onlyNumbers = filter(Boolean);
  const getUniqAxisValues = flow([onlyNumbers, dedupe, axisValueMap]);

  const axisValues = getUniqAxisValues(toolpaths.blocks);

  return {
    axis,
    min: min(axisValues) as number,
    max: max(axisValues) as number
  };
}

export const getAxisLimits = (axis: HmcAxis) => (toolpaths: Toolpath) =>
  _getAxisLimits(axis, toolpaths);
