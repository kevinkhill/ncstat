"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Tool_1 = __importDefault(require("./Tool"));
var feedrateRegex = /F([0-9]+(?:\\.[0-9]*)?)/g;
var Toolpath = (function () {
    function Toolpath(block) {
        this.lines = [];
        this.cannedCycles = [];
        this.tool = new Tool_1.default(block);
    }
    Toolpath.prototype.hasFeedrates = function () {
        return this.lines.some(function (line) { return feedrateRegex.test(line); });
    };
    Toolpath.prototype.getFeedrates = function () {
        return lodash_1.default(this.lines)
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
exports.default = Toolpath;
//# sourceMappingURL=Toolpath.js.map