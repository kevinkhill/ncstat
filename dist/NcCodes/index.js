import _ from "lodash";
import { G_CODES as RAW_G_CODES } from "./gcodes";
import { M_CODES as RAW_M_CODES } from "./mcodes";
export var Modals;
(function (Modals) {
    Modals["RAPID"] = "G00";
    Modals["FEED"] = "G01";
    Modals["ABSOLUTE"] = "G90";
    Modals["INCREMENTAL"] = "G91";
})(Modals || (Modals = {}));
export var G_CODES = {};
export var M_CODES = {};
export var CANNED_CYCLE = {
    RETRACT_CODES: ["G98", "G99"],
    START_CODES: ["G73", "G74", "G81", "G82", "G83", "G84", "G85", "G86", "G87"]
};
export var COMMANDS = {
    G: function (n) { return G_CODES["G" + n]; },
    M: function (n) { return M_CODES["M" + n]; }
};
_.forEach(RAW_G_CODES, function (groupName, group) {
    _.forEach(groupName, function (command, gcode) {
        G_CODES[gcode] = {
            COMMAND: command,
            GROUP: group
        };
    });
});
_.forEach(RAW_M_CODES, function (command, mcode) {
    M_CODES[mcode] = {
        COMMAND: command,
        GROUP: "MACHINE"
    };
});
