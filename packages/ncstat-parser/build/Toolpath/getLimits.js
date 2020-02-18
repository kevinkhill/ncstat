"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._getLimits = _getLimits;
exports.getLimits = void 0;

var _fp = require("lodash/fp");

var _getAxisLimits = require("./getAxisLimits");

var _Toolpath = require("./Toolpath");

function _getLimits(axis, toolp) {
  var _ref, _minBy, _ref2, _maxBy;

  const toolpaths = [];

  if (toolp instanceof _Toolpath.Toolpath) {
    // eslint-disable-next-line no-param-reassign
    toolp = [toolp];
  }

  toolp.forEach(t => toolpaths.push(t));
  const allLimits = (0, _fp.map)(
    (0, _getAxisLimits.getAxisLimits)(axis),
    toolpaths
  );
  return {
    axis,
    min:
      (_ref =
        (_minBy = (0, _fp.minBy)((0, _fp.get)("min"), allLimits)) ===
          null || _minBy === void 0
          ? void 0
          : _minBy.min) !== null && _ref !== void 0
        ? _ref
        : NaN,
    max:
      (_ref2 =
        (_maxBy = (0, _fp.maxBy)((0, _fp.get)("max"), allLimits)) ===
          null || _maxBy === void 0
          ? void 0
          : _maxBy.max) !== null && _ref2 !== void 0
        ? _ref2
        : NaN
  };
}

const getLimits = (0, _fp.curry)(_getLimits);
exports.getLimits = getLimits;
