import Block from "./Block";
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
    CannedCycle.prototype.getPeck = function () {
        return this.Q;
    };
    CannedCycle.prototype.getDepth = function () {
        return this.Z;
    };
    CannedCycle.prototype.getRetract = function () {
        return this.R;
    };
    CannedCycle.prototype.getFeedrate = function () {
        return this.F;
    };
    CannedCycle.prototype.addPoint = function (point) {
        var position = point instanceof Block ? point.getPosition() : point;
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
export default CannedCycle;
