"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var NcCodes_1 = require("../NcCodes");
var Block_1 = require("./Block");
var CannedCycle = /** @class */ (function (_super) {
    __extends(CannedCycle, _super);
    function CannedCycle(line) {
        var _this = _super.call(this, line) || this;
        _this.points = [];
        _this.Q = _this.getAddress("Q");
        _this.Z = _this.getAddress("Z");
        _this.R = _this.getAddress("R");
        _this.F = _this.getAddress("F");
        _this.cycleCommand = _this.getCannedCycleStartCode();
        _this.retractCommand = _this.getRetractCode();
        return _this;
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
    CannedCycle.prototype.getRetractCode = function () {
        return lodash_1.default(this.rawAddresses)
            .intersection(["G98", "G99"])
            .first();
    };
    CannedCycle.prototype.getCannedCycleStartCode = function () {
        return lodash_1.default(this.rawAddresses)
            .intersection(NcCodes_1.CANNED_CYCLE_START_CODES)
            .first();
    };
    CannedCycle.prototype.addPoint = function (point) {
        var position = point instanceof Block_1.Block ? point.getPosition() : point;
        this.points.push(position);
        return this;
    };
    CannedCycle.prototype.getPoints = function () {
        return this.points;
    };
    CannedCycle.prototype.getPointCount = function () {
        return this.points.length;
    };
    return CannedCycle;
}(Block_1.Block));
exports.CannedCycle = CannedCycle;
