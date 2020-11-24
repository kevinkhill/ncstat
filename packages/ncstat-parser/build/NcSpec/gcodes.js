"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.G_CODE_MODAL_GROUPS = exports.gCodeNumbers = exports.gCodeStrings = exports.G_CODE = exports.WORK_COORDINATE_SYSTEM = exports.CANNED_CYCLE_RETURN_MODE = exports.TOOL_LENGTH_OFFSET = exports.CUTTER_RADIUS_COMP = exports.INCH_METRIC = exports.FEED_RATE_MODE = exports.ABSOLUTE_INCREMENTAL = exports.PLANE_SELECTION = exports.MOTION_CODES = void 0;
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
exports.MOTION_CODES = GROUP_01;
// plane selection – XY, YZ, ZX
const GROUP_02 = ["G17", "G18", "G19"];
exports.PLANE_SELECTION = GROUP_02;
// absolute / incremental mode
const GROUP_03 = ["G90", "G91"];
exports.ABSOLUTE_INCREMENTAL = GROUP_03;
// feed rate mode
const GROUP_05 = ["G93", "G94"];
exports.FEED_RATE_MODE = GROUP_05;
// units – inches / millimeters
const GROUP_06 = ["G20", "G21"];
exports.INCH_METRIC = GROUP_06;
// cutter radius compensation – CRC
const GROUP_07 = ["G40", "G41", "G42"];
exports.CUTTER_RADIUS_COMP = GROUP_07;
// tool length offset – TLO
const GROUP_08 = ["G43", "G49"];
exports.TOOL_LENGTH_OFFSET = GROUP_08;
// return mode in canned cycles
const GROUP_10 = ["G98", "G99"];
exports.CANNED_CYCLE_RETURN_MODE = GROUP_10;
// work coordinate system selection – WCSS
const GROUP_12 = ["G54", "G55", "G56", "G57", "G58", "G59"];
exports.WORK_COORDINATE_SYSTEM = GROUP_12;
/**
 * Arrays of G Codes, grouped by their respective GROUP_nn
 */
exports.G_CODE = {
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
function gCodeStrings(group) {
    return exports.G_CODE[group];
}
exports.gCodeStrings = gCodeStrings;
/**
 * Returns an array of G Codes, as integers, given the name of a group
 */
function gCodeNumbers(group) {
    return exports.G_CODE[group].map((code) => parseInt(code.substring(1)));
}
exports.gCodeNumbers = gCodeNumbers;
exports.G_CODE_MODAL_GROUPS = Object.keys(exports.G_CODE);
//# sourceMappingURL=gcodes.js.map