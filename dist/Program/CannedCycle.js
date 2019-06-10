"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var Block_1 = require("./Block");
var NcCodes_1 = require("../NcCodes");
exports.CANNED_CYCLE_ARGS = ['Z', 'R', 'Q', 'F'];
var CannedCycle = /** @class */ (function () {
    function CannedCycle(block) {
        var _this = this;
        this._points = [];
        this.block = block;
        this._points = [];
        this.peck = this.block.getAddress('Q');
        this.depth = this.block.getAddress('Z');
        this.retract = this.block.getAddress('R');
        this.feedrate = this.block.getAddress('F');
        this.cycleCommand = lodash_1.flatten(lodash_1.intersection(this.block.addresses, NcCodes_1.CANNED_CYCLE_START_CODES));
        this.retractCommand = lodash_1.flatten(lodash_1.intersection(this.block.addresses, ['G98', 'G99']));
        this.G98 = this.block.addresses.indexOf('G98') > -1;
        this.G99 = this.block.addresses.indexOf('G99') > -1;
        exports.CANNED_CYCLE_ARGS.forEach(function (ltr) {
            _this[ltr] = _this.block.getAddress(ltr, true);
        });
    }
    CannedCycle.prototype.addPoint = function (point) {
        var position = point instanceof Block_1.default ? point.getPosition() : point;
        this._points.push(position);
    };
    CannedCycle.prototype.getPoints = function () {
        return this._points;
    };
    CannedCycle.prototype.getPointCount = function () {
        return this._points.length;
    };
    return CannedCycle;
}());
exports.default = CannedCycle;
//# sourceMappingURL=CannedCycle.js.map