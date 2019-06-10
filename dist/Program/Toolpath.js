"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nLineRegex = /^N([0-9]+)/;
var feedrateRegex = /F([0-9]+(?:\\.[0-9]*)?)/g;
function uncomment(str) {
    return str.replace("(", "").replace(")", "").trim();
}
var Toolpath = /** @class */ (function () {
    function Toolpath(line) {
        this.lines = [];
        this.cannedCycles = [];
        this.tool = {
            desc: "",
            num: parseInt(line.match(nLineRegex)[1]),
        };
        this.tool.desc = uncomment(line.replace("N" + this.tool.num, ""));
    }
    Toolpath.prototype.hasFeedrates = function () {
        return this.lines.some(function (line) { return feedrateRegex.test(line); });
    };
    Toolpath.prototype.getFeedrates = function () {
        var feedrates = [];
        this.lines.forEach(function (line) {
            if (feedrateRegex.test(line)) {
                var feedrate = line.match(feedrateRegex);
                feedrates.push(parseFloat(feedrate[1]));
            }
        });
        return feedrates;
    };
    Toolpath.prototype.getCannedCycleCount = function () {
        return this.cannedCycles.length;
    };
    return Toolpath;
}());
exports.default = Toolpath;
