"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterByPrefix = filterByPrefix;
exports.findByPrefix = findByPrefix;
exports.findByType = findByType;
exports.getMcodes = exports.getGcodes = exports.prefixWith = exports.getPrefix = exports.getType = void 0;

var _fp = require("lodash/fp");

const getType = (0, _fp.prop)("type");
exports.getType = getType;
const getPrefix = (0, _fp.prop)("prefix");
exports.getPrefix = getPrefix;

const prefixWith = prefix => code => `${prefix}${code}`;

exports.prefixWith = prefixWith;

function filterByPrefix(prefix, tokens) {
  return tokens.filter(token => getPrefix(token) === prefix);
}

function findByPrefix(prefix, tokens) {
  return tokens.find(token => getPrefix(token) === prefix);
}

function findByType(type, tokens) {
  return tokens.find(token => token.isA(type));
}

const getGcodes = filterByPrefix.bind(null, "G");
exports.getGcodes = getGcodes;
const getMcodes = filterByPrefix.bind(null, "M");
exports.getMcodes = getMcodes;
