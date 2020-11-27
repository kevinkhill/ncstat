"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modals = void 0;
var Modals;
(function (Modals) {
    // GROUP_00 = "NON_MODAL",
    // NON_MODAL = "GROUP_00",
    Modals["GROUP_01"] = "MOTION_CODES";
    Modals["MOTION_CODES"] = "GROUP_01";
    Modals["G00"] = "RAPID";
    Modals["G01"] = "FEED";
    Modals["RAPID"] = "G00";
    Modals["FEED"] = "G01";
    Modals["GROUP_02"] = "PLANE_SELECTION";
    Modals["PLANE_SELECTION"] = "GROUP_02";
    Modals["G17"] = "XY";
    Modals["G18"] = "XZ";
    Modals["G19"] = "YZ";
    Modals["XY"] = "G17";
    Modals["XZ"] = "G18";
    Modals["YZ"] = "G19";
    Modals["GROUP_03"] = "POSITIONING_MODE";
    Modals["POSITIONING_MODE"] = "GROUP_03";
    Modals["G90"] = "ABSOLUTE";
    Modals["G91"] = "INCREMENTAL";
    Modals["ABSOLUTE"] = "G90";
    Modals["INCREMENTAL"] = "G91";
})(Modals = exports.Modals || (exports.Modals = {}));
//# sourceMappingURL=modals.js.map