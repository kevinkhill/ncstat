"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Block_1 = require("./Block");
exports.CANNED_CYCLE_DEFAULT_ARGS = ["Z", "R", "Q", "F"];
exports.CANNED_CYCLE_START_CODES = [
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
var CannedCycle = /** @class */ (function () {
    function CannedCycle(block) {
        var _this = this;
        this.points = [];
        this.block = block;
        this.peck = this.block.getAddress("Q");
        this.depth = this.block.getAddress("Z");
        this.retract = this.block.getAddress("R");
        this.feedrate = this.block.getAddress("F");
        this.cycleCommand = _.flatten(_.intersection(this.block.addresses, exports.CANNED_CYCLE_START_CODES));
        this.retractCommand = _.flatten(_.intersection(this.block.addresses, ["G98", "G99"]));
        this.G98 = this.block.addresses.indexOf("G98") > -1;
        this.G99 = this.block.addresses.indexOf("G99") > -1;
        exports.CANNED_CYCLE_DEFAULT_ARGS.forEach(function (ltr) { return (_this[ltr] = _this.block.getAddress(ltr)); });
    }
    CannedCycle.prototype.addPoint = function (point) {
        var position = point instanceof Block_1.Block ? point.getPosition() : point;
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
exports.CannedCycle = CannedCycle;
