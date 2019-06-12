"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Toolpath = /** @class */ (function () {
    function Toolpath(line) {
        this.feedrateRegex = /F([0-9]+(?:\\.[0-9]*)?)/g;
        this.lines = [];
        this.cannedCycles = [];
        this.tool = {
            desc: "",
            num: parseInt(line.match(/^N([0-9]+)/)[1])
        };
        this.tool.desc = this.uncomment(line.replace("N" + this.tool.num, ""));
    }
    Toolpath.prototype.hasFeedrates = function () {
        var _this = this;
        return this.lines.some(function (line) { return _this.feedrateRegex.test(line); });
    };
    Toolpath.prototype.getFeedrates = function () {
        var _this = this;
        var feedrates = [];
        this.lines.forEach(function (line) {
            if (_this.feedrateRegex.test(line)) {
                var feedrate = line.match(_this.feedrateRegex);
                feedrates.push(parseFloat(feedrate[1]));
            }
        });
        return feedrates;
    };
    Toolpath.prototype.getCannedCycleCount = function () {
        return this.cannedCycles.length;
    };
    Toolpath.prototype.uncomment = function (str) {
        return str
            .replace("(", "")
            .replace(")", "")
            .trim();
    };
    return Toolpath;
}());
exports.Toolpath = Toolpath;
