"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gCodeStrings = gCodeStrings;
exports.gCodeNumbers = gCodeNumbers;
exports.G_CODE_MODAL_GROUPS = exports.G_CODE = exports.WORK_COORDINATE_SYSTEM = exports.CANNED_CYCLE_RETURN_MODE = exports.TOOL_LENGTH_OFFSET = exports.CUTTER_RADIUS_COMP = exports.INCH_METRIC = exports.FEED_RATE_MODE = exports.ABSOLUTE_INCREMENTAL = exports.PLANE_SELECTION = exports.MOTION_CODES = void 0;
// motion
const GROUP_01 = [
  "G00",
  "G01",
  "G02",
  "G03",
  "G80",
  "G81",
  "G82",
  "G84",
  "G85",
  "G86",
  "G87",
  "G88",
  "G89"
];
const MOTION_CODES = GROUP_01; // plane selection – XY, YZ, ZX

exports.MOTION_CODES = MOTION_CODES;
const GROUP_02 = ["G17", "G18", "G19"];
const PLANE_SELECTION = GROUP_02; // absolute / incremental mode

exports.PLANE_SELECTION = PLANE_SELECTION;
const GROUP_03 = ["G90", "G91"];
const ABSOLUTE_INCREMENTAL = GROUP_03; // feed rate mode

exports.ABSOLUTE_INCREMENTAL = ABSOLUTE_INCREMENTAL;
const GROUP_05 = ["G93", "G94"];
const FEED_RATE_MODE = GROUP_05; // units – inches / millimeters

exports.FEED_RATE_MODE = FEED_RATE_MODE;
const GROUP_06 = ["G20", "G21"];
const INCH_METRIC = GROUP_06; // cutter radius compensation – CRC

exports.INCH_METRIC = INCH_METRIC;
const GROUP_07 = ["G40", "G41", "G42"];
const CUTTER_RADIUS_COMP = GROUP_07; // tool length offset – TLO

exports.CUTTER_RADIUS_COMP = CUTTER_RADIUS_COMP;
const GROUP_08 = ["G43", "G49"];
const TOOL_LENGTH_OFFSET = GROUP_08; // return mode in canned cycles

exports.TOOL_LENGTH_OFFSET = TOOL_LENGTH_OFFSET;
const GROUP_10 = ["G98", "G99"];
const CANNED_CYCLE_RETURN_MODE = GROUP_10; // work coordinate system selection – WCSS

exports.CANNED_CYCLE_RETURN_MODE = CANNED_CYCLE_RETURN_MODE;
const GROUP_12 = ["G54", "G55", "G56", "G57", "G58", "G59"];
const WORK_COORDINATE_SYSTEM = GROUP_12;
/**
 * Arrays of G Codes, grouped by their respective GROUP_nn
 */

exports.WORK_COORDINATE_SYSTEM = WORK_COORDINATE_SYSTEM;
const G_CODE = {
  GROUP_01,
  GROUP_02,
  GROUP_03,
  GROUP_05,
  GROUP_06,
  GROUP_07,
  GROUP_08,
  GROUP_10,
  GROUP_12
};
/**
 * Returns an array of G Codes, as strings, given the name of a group
 */

exports.G_CODE = G_CODE;

function gCodeStrings(group) {
  return G_CODE[group];
}
/**
 * Returns an array of G Codes, as integers, given the name of a group
 */

function gCodeNumbers(group) {
  return G_CODE[group].map(code => parseInt(code.substring(1)));
}

const G_CODE_MODAL_GROUPS = Object.keys(G_CODE);
exports.G_CODE_MODAL_GROUPS = G_CODE_MODAL_GROUPS;
