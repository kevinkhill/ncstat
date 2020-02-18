"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedupe = dedupe;
exports._getAxisLimits = _getAxisLimits;
exports.getAxisLimits = void 0;

var _fp = require("lodash/fp");

function dedupe(arr) {
  return Array.from(new Set(arr));
}

function _getAxisLimits(axis, toolpaths) {
  const getAxisValue = (0, _fp.get)(`values.${axis}`);
  const axisValueMap = (0, _fp.map)(getAxisValue);
  const onlyNumbers = (0, _fp.filter)(Boolean);
  const getUniqAxisValues = (0, _fp.flow)([
    onlyNumbers,
    dedupe,
    axisValueMap
  ]);
  const axisValues = getUniqAxisValues(toolpaths.blocks);
  return {
    axis,
    min: (0, _fp.min)(axisValues),
    max: (0, _fp.max)(axisValues)
  };
}

const getAxisLimits = (0, _fp.curry)(_getAxisLimits);
exports.getAxisLimits = getAxisLimits;
