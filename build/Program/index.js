"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var fs_1 = __importDefault(require("fs"));
var javascript_state_machine_1 = __importDefault(require("javascript-state-machine"));
var lodash_1 = __importDefault(require("lodash"));
var readline_1 = __importDefault(require("readline"));
var NcCodes_1 = require("../NcCodes");
var Block_1 = __importDefault(require("./Block"));
var CannedCycle_1 = __importDefault(require("./CannedCycle"));
var Toolpath_1 = __importDefault(require("./Toolpath"));
var log = debug_1.default("nc-scanner:Program");
var Program = (function () {
    function Program(filepath) {
        this.filepath = filepath;
        this.activeModals = {};
        this.toolpaths = [];
        this.blocks = [];
        this.rawLines = [];
        this.position = {
            curr: { X: 0, Y: 0, Z: 0, B: 0 },
            prev: { X: 0, Y: 0, Z: 0, B: 0 }
        };
        this.prgExec = new javascript_state_machine_1.default({
            init: "idle",
            transitions: [
                { name: "start-toolpath", from: "idle", to: "toolpathing" },
                { name: "end-toolpath", from: "toolpathing", to: "idle" },
                {
                    name: "start-canned-cycle",
                    from: "toolpathing",
                    to: "in-canned-cycle"
                },
                { name: "end-canned-cycle", from: "in-canned-cycle", to: "toolpathing" }
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
        return lodash_1.default.map(this.toolpaths, function (toolpath) { return toolpath.tool; });
    };
    Program.prototype.isActiveModal = function (valAddr) {
        return this.activeModals[valAddr];
    };
    Program.prototype.analyze = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var toolpath, _b, _c, line, block, cannedCycle, point, lastCC, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, 6, 11]);
                        _b = __asyncValues(this.getLine());
                        _d.label = 1;
                    case 1: return [4, _b.next()];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3, 4];
                        line = _c.value;
                        block = new Block_1.default(line);
                        this.rawLines.push(line);
                        this.blocks.push(block);
                        this.setModals(block);
                        this.extractProgramNumberAndTitle(block);
                        if (block.hasMovement()) {
                            this.updatePosition(block);
                        }
                        if (block.isStartOfCannedCycle() && this.prgExec.is("toolpathing")) {
                            this.prgExec.startCannedCycle();
                            cannedCycle = new CannedCycle_1.default(block);
                            toolpath.addCannedCycle(cannedCycle);
                        }
                        if (this.prgExec.is("in-canned-cycle")) {
                            if (block.G(80)) {
                                this.prgExec.endCannedCycle();
                            }
                            if (block.hasMovement()) {
                                point = lodash_1.default.clone(this.position.curr);
                                lastCC = lodash_1.default.last(toolpath.cannedCycles);
                                lastCC.addPoint(point);
                            }
                        }
                        if (line.startsWith("N")) {
                            if (this.prgExec.is("toolpathing")) {
                                this.prgExec.endToolpath();
                                this.toolpaths.push(toolpath);
                            }
                            if (this.prgExec.is("idle")) {
                                toolpath = new Toolpath_1.default(block);
                                this.prgExec.startToolpath();
                            }
                        }
                        if (this.prgExec.is("toolpathing") ||
                            this.prgExec.is("in-canned-cycle")) {
                            toolpath.lines.push(line);
                        }
                        _d.label = 3;
                    case 3: return [3, 1];
                    case 4: return [3, 11];
                    case 5:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 11];
                    case 6:
                        _d.trys.push([6, , 9, 10]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3, 8];
                        return [4, _a.call(_b)];
                    case 7:
                        _d.sent();
                        _d.label = 8;
                    case 8: return [3, 10];
                    case 9:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 10: return [7];
                    case 11:
                        this.prgExec.endToolpath();
                        this.toolpaths.push(toolpath);
                        return [2, this.toolpaths];
                }
            });
        });
    };
    Program.prototype.getLine = function () {
        return __asyncGenerator(this, arguments, function getLine_1() {
            var filestream, filestream_1, filestream_1_1, line, e_2_1;
            var e_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filestream = readline_1.default.createInterface({
                            crlfDelay: Infinity,
                            input: fs_1.default.createReadStream(this.filepath)
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, 9, 14]);
                        filestream_1 = __asyncValues(filestream);
                        _b.label = 2;
                    case 2: return [4, __await(filestream_1.next())];
                    case 3:
                        if (!(filestream_1_1 = _b.sent(), !filestream_1_1.done)) return [3, 7];
                        line = filestream_1_1.value;
                        if (line === "" || line === " ") {
                            return [3, 6];
                        }
                        return [4, __await(line)];
                    case 4: return [4, _b.sent()];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [3, 2];
                    case 7: return [3, 14];
                    case 8:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 14];
                    case 9:
                        _b.trys.push([9, , 12, 13]);
                        if (!(filestream_1_1 && !filestream_1_1.done && (_a = filestream_1.return))) return [3, 11];
                        return [4, __await(_a.call(filestream_1))];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11: return [3, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 13: return [7];
                    case 14: return [2];
                }
            });
        });
    };
    Program.prototype.updatePosition = function (block) {
        var _this = this;
        var blockPosition = block.getPosition();
        this.position.prev = this.position.curr;
        ["B", "X", "Y", "Z"].forEach(function (axis) {
            if (blockPosition[axis]) {
                if (_this.activeModals[NcCodes_1.Modals.INCREMENTAL]) {
                    _this.position.curr[axis] += blockPosition[axis];
                }
                else if (_this.activeModals[NcCodes_1.Modals.ABSOLUTE]) {
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
            this.activeModals[NcCodes_1.Modals.RAPID] = true;
            this.activeModals[NcCodes_1.Modals.FEED] = false;
        }
        else if (block.G(1)) {
            this.activeModals[NcCodes_1.Modals.FEED] = true;
            this.activeModals[NcCodes_1.Modals.RAPID] = false;
        }
        if (block.G(90)) {
            this.activeModals[NcCodes_1.Modals.ABSOLUTE] = true;
            this.activeModals[NcCodes_1.Modals.INCREMENTAL] = false;
        }
        else if (block.G(91)) {
            this.activeModals[NcCodes_1.Modals.INCREMENTAL] = true;
            this.activeModals[NcCodes_1.Modals.ABSOLUTE] = false;
        }
    };
    return Program;
}());
exports.default = Program;
//# sourceMappingURL=index.js.map