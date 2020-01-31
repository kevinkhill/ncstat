import Debug from "debug";
import StateMachine from "javascript-state-machine";
import _ from "lodash";
import { Modals } from "../NcCodes";
import Block from "./Block";
import CannedCycle from "./CannedCycle";
import Toolpath from "./Toolpath";
var log = Debug("ncstat:Program");
var Program = (function () {
    function Program(rawLines) {
        this.rawLines = rawLines;
        this.activeModals = {};
        this.toolpaths = [];
        this.blocks = [];
        this.position = {
            curr: { X: 0, Y: 0, Z: 0, B: 0 },
            prev: { X: 0, Y: 0, Z: 0, B: 0 }
        };
        this.prgExec = new StateMachine({
            init: "idle",
            transitions: [
                {
                    name: "start-toolpath",
                    from: "idle",
                    to: "toolpathing"
                },
                {
                    name: "end-toolpath",
                    from: "toolpathing",
                    to: "idle"
                },
                {
                    name: "start-canned-cycle",
                    from: "toolpathing",
                    to: "in-canned-cycle"
                },
                {
                    name: "end-canned-cycle",
                    from: "in-canned-cycle",
                    to: "toolpathing"
                }
            ]
        });
    }
    Program.prototype.toString = function () {
        return this.rawLines.join("\n");
    };
    Program.prototype.getNumber = function () {
        return this.number;
    };
    Program.prototype.getTitle = function () {
        return this.title;
    };
    Program.prototype.getToolpathCount = function () {
        return this.toolpaths.length;
    };
    Program.prototype.getPosition = function () {
        return this.position.curr;
    };
    Program.prototype.getPrevPosition = function () {
        return this.position.prev;
    };
    Program.prototype.getToolPaths = function () {
        return this.toolpaths;
    };
    Program.prototype.getToolList = function () {
        return _.map(this.toolpaths, function (toolpath) { return toolpath.tool; });
    };
    Program.prototype.isActiveModal = function (valAddr) {
        return this.activeModals[valAddr];
    };
    Program.prototype.analyze = function () {
        var toolpath;
        for (var _i = 0, _a = this.rawLines; _i < _a.length; _i++) {
            var line = _a[_i];
            if (line !== " ") {
                var block = new Block(line);
                this.blocks.push(block);
                this.setModals(block);
                this.extractProgramNumberAndTitle(block);
                if (block.hasMovement()) {
                    this.updatePosition(block);
                }
                if (block.isStartOfCannedCycle() && this.prgExec.is("toolpathing")) {
                    this.prgExec.startCannedCycle();
                    var cannedCycle = new CannedCycle(block);
                    toolpath.addCannedCycle(cannedCycle);
                }
                if (this.prgExec.is("in-canned-cycle")) {
                    if (block.G(80)) {
                        this.prgExec.endCannedCycle();
                    }
                    if (block.hasMovement()) {
                        var point = _.clone(this.position.curr);
                        var lastCC = _.last(toolpath.cannedCycles);
                        lastCC.addPoint(point);
                    }
                }
                if (line.startsWith("N")) {
                    if (this.prgExec.is("toolpathing")) {
                        this.prgExec.endToolpath();
                        this.toolpaths.push(toolpath);
                    }
                    if (this.prgExec.is("idle")) {
                        toolpath = new Toolpath(block);
                        this.prgExec.startToolpath();
                    }
                }
                if (this.prgExec.is("toolpathing") ||
                    this.prgExec.is("in-canned-cycle")) {
                    toolpath.lines.push(line);
                }
            }
        }
        this.prgExec.endToolpath();
        this.toolpaths.push(toolpath);
    };
    Program.prototype.updatePosition = function (block) {
        var _this = this;
        var blockPosition = block.getPosition();
        this.position.prev = this.position.curr;
        ["B", "X", "Y", "Z"].forEach(function (axis) {
            if (blockPosition[axis]) {
                if (_this.activeModals[Modals.INCREMENTAL]) {
                    _this.position.curr[axis] += blockPosition[axis];
                }
                else if (_this.activeModals[Modals.ABSOLUTE]) {
                    _this.position.curr[axis] = blockPosition[axis];
                }
            }
        });
    };
    Program.prototype.extractProgramNumberAndTitle = function (block) {
        if (block.hasAddress("O")) {
            this.number = block.values.O;
            this.title = block.getComment();
        }
    };
    Program.prototype.setModals = function (block) {
        if (block.G(0)) {
            this.activeModals[Modals.RAPID] = true;
            this.activeModals[Modals.FEED] = false;
        }
        else if (block.G(1)) {
            this.activeModals[Modals.FEED] = true;
            this.activeModals[Modals.RAPID] = false;
        }
        if (block.G(90)) {
            this.activeModals[Modals.ABSOLUTE] = true;
            this.activeModals[Modals.INCREMENTAL] = false;
        }
        else if (block.G(91)) {
            this.activeModals[Modals.INCREMENTAL] = true;
            this.activeModals[Modals.ABSOLUTE] = false;
        }
    };
    return Program;
}());
export default Program;
