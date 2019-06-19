"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var lodash_1 = __importDefault(require("lodash"));
var lib_1 = require("../lib");
var NcCodes_1 = require("../NcCodes");
var Address_1 = __importDefault(require("./Address"));
var log = debug_1.default("nc-scanner");
var Block = (function () {
    function Block(line) {
        var _this = this;
        this.blockSkip = null;
        this.values = {};
        this.rawLine = "";
        this.gCodes = [];
        this.mCodes = [];
        this.addresses = [];
        this.rawAddresses = [];
        this.comment = null;
        this.addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;
        this.rawLine = line;
        this.rawAddresses = this.rawLine.match(this.addressRegex);
        this.gCodes = lodash_1.default(this.rawAddresses)
            .filter(function (a) { return a.startsWith("G"); })
            .map(function (a) { return parseInt(a.slice(1)); })
            .value();
        this.mCodes = lodash_1.default(this.rawAddresses)
            .filter(function (a) { return a.startsWith("M"); })
            .map(function (a) { return parseInt(a.slice(1)); })
            .value();
        this.addresses = lodash_1.default.map(this.rawAddresses, Address_1.default.factory);
        lodash_1.default.forEach(this.addresses, function (address) {
            _this.values[address.prefix] = address.value;
        });
        this.comment = lib_1.extractors.commentExtractor(this.rawLine);
        this.blockSkip = lib_1.extractors.blockSkipExtractor(this.rawLine);
    }
    Block.prototype.G = function (code) {
        return this.gCodes.includes(code);
    };
    Block.prototype.M = function (code) {
        return this.mCodes.includes(code);
    };
    Block.prototype.getComment = function () {
        return this.comment;
    };
    Block.prototype.getPosition = function () {
        return {
            B: this.values.B,
            X: this.values.X,
            Y: this.values.Y,
            Z: this.values.Z
        };
    };
    Block.prototype.getRetractCode = function () {
        return lodash_1.default(this.rawAddresses)
            .intersection(NcCodes_1.CANNED_CYCLE.RETRACT_CODES)
            .first();
    };
    Block.prototype.isStartOfCannedCycle = function () {
        var addresses = lodash_1.default(this.rawAddresses)
            .intersection(NcCodes_1.CANNED_CYCLE.START_CODES)
            .value();
        return addresses.length > 0;
    };
    Block.prototype.getCannedCycleStartCode = function () {
        return lodash_1.default(this.rawAddresses)
            .intersection(NcCodes_1.CANNED_CYCLE.START_CODES)
            .first();
    };
    Block.prototype.hasMovement = function () {
        if (lodash_1.default.intersection(this.gCodes, [4, 10, 65]).length > 0) {
            return false;
        }
        return (lodash_1.default.isNumber(this.values.B) ||
            lodash_1.default.isNumber(this.values.X) ||
            lodash_1.default.isNumber(this.values.Y) ||
            lodash_1.default.isNumber(this.values.Z));
    };
    Block.prototype.hasAddress = function (ltr) {
        return this.values.hasOwnProperty(ltr);
    };
    Block.prototype.getValue = function (prefix) {
        return this.hasAddress(prefix) ? this.values[prefix] : null;
    };
    Block.prototype.getAddr = function (addrPrefix) {
        if (this.hasAddress(addrPrefix)) {
            return lodash_1.default.find(this.addresses, ["prefix", addrPrefix]);
        }
        return {
            prefix: undefined,
            value: undefined
        };
    };
    return Block;
}());
exports.default = Block;
//# sourceMappingURL=Block.js.map