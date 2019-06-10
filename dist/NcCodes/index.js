"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.G_CODES = {};
exports.M_CODES = {};
exports.CANNED_CYCLE_START_CODES = [
    'G73', 'G74', 'G81', 'G82', 'G83', 'G84', 'G85', 'G86', 'G87'
];
exports.COMMANDS = {
    G: function (n) { return exports.G_CODES["G" + n]; },
    M: function (n) { return exports.M_CODES["M" + n]; }
};
var gcodes = require('./gcodes.json');
console.log(gcodes);
lodash_1.forEach(gcodes, function (groupName, group) {
    lodash_1.forEach(groupName, function (command, gcode) {
        exports.G_CODES[gcode] = {
            COMMAND: command,
            GROUP: group
        };
    });
});
var mcodes = require('./mcodes.json');
lodash_1.forEach(mcodes, function (command, mcode) {
    exports.M_CODES[mcode] = {
        COMMAND: command,
        GROUP: 'MACHINE'
    };
});
//# sourceMappingURL=index.js.map