import _ from "lodash";
import Block from "./Block";
import Tool from "./Tool";
var feedrateRegex = /F([0-9]+(?:\\.[0-9]*)?)/g;
var Toolpath = (function () {
    function Toolpath(block) {
        this.lines = [];
        this.cannedCycles = [];
        this.tool = new Tool(block);
    }
    Toolpath.fromLines = function (lines) {
        var toolpath = new Toolpath(new Block(lines[0]));
        lines.slice(1).map(toolpath.addLine);
        return toolpath;
    };
    Toolpath.prototype.addLine = function (line) {
        this.lines.push(line);
    };
    Toolpath.prototype.hasFeedrates = function () {
        return this.lines.some(function (line) { return feedrateRegex.test(line); });
    };
    Toolpath.prototype.getFeedrates = function () {
        return _(this.lines)
            .filter(function (line) { return feedrateRegex.test(line); })
            .map(function (line) { return parseFloat(line.match(feedrateRegex)[1]); });
    };
    Toolpath.prototype.addCannedCycle = function (cycle) {
        this.cannedCycles.push(cycle);
    };
    Toolpath.prototype.getCannedCycleCount = function () {
        return this.cannedCycles.length;
    };
    return Toolpath;
}());
export default Toolpath;
//# sourceMappingURL=Toolpath.js.map