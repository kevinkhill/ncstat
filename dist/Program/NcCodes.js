"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forEach = require('lodash').forEach;
var safeLoad = require('js-yaml').safeLoad;
var readFileSync = require('fs').readFileSync;
exports.G_CODES = {};
exports.M_CODES = {};
exports.CANNED_CYCLE_START_CODES = [
    'G73', 'G74', 'G81', 'G82', 'G83', 'G84', 'G85', 'G86', 'G87'
];
exports.COMMANDS = {
    G: function (n) { return exports.G_CODES["G" + n]; },
    M: function (n) { return exports.M_CODES["M" + n]; }
};
function readYaml(filepath) {
    return safeLoad(readFileSync(require.resolve(filepath)));
}
exports.readYaml = readYaml;
forEach(readYaml('../codes/gcodes.yml'), function (groupName, group) {
    forEach(groupName, function (command, gcode) {
        exports.G_CODES[gcode] = {
            COMMAND: command,
            GROUP: group
        };
    });
});
forEach(readYaml('../codes/mcodes.yml'), function (command, mcode) {
    exports.M_CODES[mcode] = {
        COMMAND: command,
        GROUP: 'MACHINE'
    };
});
//# sourceMappingURL=NcCodes.js.map