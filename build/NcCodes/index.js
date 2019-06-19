"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var gcodes_1 = require("./gcodes");
var mcodes_1 = require("./mcodes");
var Modals;
(function (Modals) {
    Modals["RAPID"] = "G00";
    Modals["FEED"] = "G01";
    Modals["ABSOLUTE"] = "G90";
    Modals["INCREMENTAL"] = "G91";
})(Modals = exports.Modals || (exports.Modals = {}));
exports.G_CODES = {};
exports.M_CODES = {};
exports.CANNED_CYCLE = {
    RETRACT_CODES: ["G98", "G99"],
    START_CODES: ["G73", "G74", "G81", "G82", "G83", "G84", "G85", "G86", "G87"]
};
exports.COMMANDS = {
    G: function (n) { return exports.G_CODES["G" + n]; },
    M: function (n) { return exports.M_CODES["M" + n]; }
};
lodash_1.default.forEach(gcodes_1.G_CODES, function (groupName, group) {
    lodash_1.default.forEach(groupName, function (command, gcode) {
        exports.G_CODES[gcode] = {
            COMMAND: command,
            GROUP: group
        };
    });
});
lodash_1.default.forEach(mcodes_1.M_CODES, function (command, mcode) {
    exports.M_CODES[mcode] = {
        COMMAND: command,
        GROUP: "MACHINE"
    };
});
//# sourceMappingURL=index.js.map