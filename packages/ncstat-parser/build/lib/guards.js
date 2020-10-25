"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.isString = isString;
exports.isValidModalGroup = isValidModalGroup;
exports.assertValidModalGroup = assertValidModalGroup;
exports.assertisValidModalGroups = assertisValidModalGroups;
exports.isValidModalGroups = isValidModalGroups;

var _gcodes = require("../NcSpec/gcodes");

function isNumber(x) {
  return typeof x === "number";
}

function isString(x) {
  return typeof x === "string";
}

function isValidModalGroup(value) {
  return _gcodes.G_CODE_MODAL_GROUPS.includes(value);
}

function assertValidModalGroup(value) {
  if (!isValidModalGroup(value)) {
    const groups = _gcodes.G_CODE_MODAL_GROUPS.join(" | ");

    throw Error(`Expected one of [ ${groups} ]", got ${value}"`);
  }
}

function assertisValidModalGroups(groups) {
  const isValidStringModalGroup = value =>
    isString(value) && isValidModalGroup(value);

  return groups.every(isValidStringModalGroup);
}

function isValidModalGroups(groups) {
  const isValidStringModalGroup = value =>
    isString(value) && isValidModalGroup(value);

  return groups.every(isValidStringModalGroup);
}
