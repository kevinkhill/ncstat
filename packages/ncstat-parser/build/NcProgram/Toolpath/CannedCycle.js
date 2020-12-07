"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannedCycle = void 0;
const NcSpec_1 = require("../../NcSpec");
class CannedCycle {
    constructor(config) {
        this.points = [];
        this.Z = config.Z;
        this.R = config.R;
        this.F = config.F;
        this.cycleCommand = config.cycleCommand;
        this.retractCommand = config.retractCommand;
        this.Q = config === null || config === void 0 ? void 0 : config.Q;
        this.definition = NcSpec_1.defineGCode(this.cycleCommand);
    }
    static fromBlock(block) {
        if (!block.isStartOfCannedCycle) {
            throw Error("The provided Block is not the start of a CannedCycle.");
        }
        return new CannedCycle({
            Q: block === null || block === void 0 ? void 0 : block.Q,
            Z: block === null || block === void 0 ? void 0 : block.Z,
            R: block === null || block === void 0 ? void 0 : block.R,
            F: block === null || block === void 0 ? void 0 : block.F,
            retractCommand: block.retractCommand,
            cycleCommand: block.cannedCycleStartCode
        });
    }
    get peck() {
        return this.Q;
    }
    get length() {
        return this.points.length;
    }
    get depth() {
        return this.Z;
    }
    get retract() {
        return this.R;
    }
    get feedrate() {
        return this.F;
    }
    addPoint(obj) {
        this.points.push(obj);
    }
}
exports.CannedCycle = CannedCycle;
CannedCycle.START_CODES = [
    "G73",
    "G74",
    "G81",
    "G82",
    "G83",
    "G84",
    "G85",
    "G86",
    "G87"
];
CannedCycle.RETRACT_CODES = ["G98", "G99"];
//# sourceMappingURL=CannedCycle.js.map