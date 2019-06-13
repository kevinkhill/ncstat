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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var lodash_es_1 = __importDefault(require("lodash-es"));
var readline = require("readline");
var NcCodes_1 = require("../NcCodes");
var Block_1 = require("./Block");
var CannedCycle_1 = require("./CannedCycle");
var Toolpath_1 = require("./Toolpath");
var BaseProgram = /** @class */ (function () {
    function BaseProgram(filepath) {
        this.toolpaths = [];
        this.blocks = [];
        this.rawLines = [];
        this.absinc = NcCodes_1.Modals.ABSOLUTE;
        this._fsm();
        this.filepath = filepath;
        this.position = {
            curr: { X: 0, Y: 0, Z: 0, B: 0 },
            prev: { X: 0, Y: 0, Z: 0, B: 0 }
        };
    }
    BaseProgram.prototype.toString = function () {
        return this.rawLines.join("\n");
    };
    BaseProgram.prototype.getToolpathCount = function () {
        return this.toolpaths.length;
    };
    BaseProgram.prototype.getPosition = function () {
        return this.position.curr;
    };
    BaseProgram.prototype.getPrevPosition = function () {
        return this.position.prev;
    };
    BaseProgram.prototype.updatePosition = function (block) {
        var _this = this;
        var position = block.getPosition();
        this.position.prev = this.position.curr;
        ["B", "X", "Y", "Z"].forEach(function (axis) {
            if (position[axis]) {
                if (_this.absinc === NcCodes_1.Modals.INCREMENTAL) {
                    _this.position.curr[axis] += position[axis];
                }
                if (_this.absinc === NcCodes_1.Modals.ABSOLUTE) {
                    _this.position.curr[axis] = position[axis];
                }
            }
        });
    };
    BaseProgram.prototype.analyze = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var fileStream, toolpath, fileStream_1, fileStream_1_1, line, block, cannedCycle, point, lastCC, e_1_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fileStream = readline.createInterface({
                            crlfDelay: Infinity,
                            input: fs.createReadStream(this.filepath)
                        });
                        toolpath = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 12]);
                        fileStream_1 = __asyncValues(fileStream);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, fileStream_1.next()];
                    case 3:
                        if (!(fileStream_1_1 = _b.sent(), !fileStream_1_1.done)) return [3 /*break*/, 5];
                        line = fileStream_1_1.value;
                        if (line !== "") {
                            block = new Block_1.Block(line);
                            this.blocks.push(block);
                            this.rawLines.push(line);
                            this.setModals(block);
                            if (block.hasAddress("O")) {
                                this.number = block.getAddress("O");
                                this.title = block.comment;
                            }
                            if (block.hasMovement()) {
                                this.updatePosition(block);
                            }
                            if (block.isStartOfCannedCycle() && this.is("toolpathing")) {
                                this.startCannedCycle();
                                cannedCycle = new CannedCycle_1.CannedCycle(block);
                                toolpath.cannedCycles.push(cannedCycle);
                            }
                            if (this.is("in-canned-cycle") && block.G(80)) {
                                this.endCannedCycle();
                            }
                            if (this.is("in-canned-cycle") && block.hasMovement()) {
                                point = lodash_es_1.default.clone(this.position.curr);
                                lastCC = lodash_es_1.default.last(toolpath.cannedCycles);
                                lastCC.addPoint(point);
                            }
                            if (line[0] === "N") {
                                if (this.is("toolpathing")) {
                                    this.endToolpath();
                                    this.toolpaths.push(toolpath);
                                }
                                if (this.is("idle")) {
                                    toolpath = new Toolpath_1.Toolpath(line);
                                    this.startToolpath();
                                }
                            }
                            // If we're toolpathing and `line` is not empty, save it to the toolpath
                            if ((this.is("toolpathing") || this.is("in-canned-cycle")) &&
                                line !== "" &&
                                line !== " ") {
                                toolpath.lines.push(line);
                            }
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _b.trys.push([7, , 10, 11]);
                        if (!(fileStream_1_1 && !fileStream_1_1.done && (_a = fileStream_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(fileStream_1)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        this.endToolpath();
                        this.toolpaths.push(toolpath);
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseProgram.prototype.setModals = function (block) {
        this.activeModals = [];
        if (block.G(0)) {
            this.rapfeed = NcCodes_1.Modals.RAPID;
            this.activeModals.push(NcCodes_1.Modals.RAPID);
        }
        else if (block.G(1)) {
            this.rapfeed = NcCodes_1.Modals.FEED;
            this.activeModals.push(NcCodes_1.Modals.FEED);
        }
        if (block.G(90)) {
            this.absinc = NcCodes_1.Modals.ABSOLUTE;
            this.activeModals.push(NcCodes_1.Modals.ABSOLUTE);
        }
        else if (block.G(91)) {
            this.absinc = NcCodes_1.Modals.INCREMENTAL;
            this.activeModals.push(NcCodes_1.Modals.INCREMENTAL);
        }
    };
    return BaseProgram;
}());
exports.BaseProgram = BaseProgram;
