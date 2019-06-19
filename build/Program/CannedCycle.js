"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Block_1 = __importDefault(require("./Block"));
var CannedCycle = (function () {
    function CannedCycle(block) {
        this.points = [];
        this.Q = block.values.Q;
        this.Z = block.values.Z;
        this.R = block.values.R;
        this.F = block.values.F;
        this.cycleCommand = block.getCannedCycleStartCode();
        this.retractCommand = block.getRetractCode();
    }
    Object.defineProperty(CannedCycle.prototype, "peck", {
        get: function () {
            return this.Q;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CannedCycle.prototype, "depth", {
        get: function () {
            return this.Z;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CannedCycle.prototype, "retract", {
        get: function () {
            return this.R;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CannedCycle.prototype, "feedrate", {
        get: function () {
            return this.F;
        },
        enumerable: true,
        configurable: true
    });
    CannedCycle.prototype.addPoint = function (point) {
        var position = point instanceof Block_1.default ? point.getPosition() : point;
        this.points.push(position);
    };
    CannedCycle.prototype.getPoints = function () {
        return this.points;
    };
    CannedCycle.prototype.getPointCount = function () {
        return this.points.length;
    };
    return CannedCycle;
}());
exports.default = CannedCycle;
//# sourceMappingURL=CannedCycle.js.map