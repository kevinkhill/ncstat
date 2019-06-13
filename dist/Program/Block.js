"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var lodash_es_1 = __importDefault(require("lodash-es"));
var lib_1 = require("../lib");
var NcCodes_1 = require("../NcCodes");
var Address_1 = require("./Address");
var debug = debug_1.default("nc-scanner");
var Block = /** @class */ (function () {
    function Block(line) {
        var _this = this;
        this.comment = null;
        this.blockSkip = null;
        this.gCodes = [];
        this.rawAddresses = [];
        this.addresses = [];
        this.addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;
        this.rawLine = "";
        this.rawLine = line;
        this.rawAddresses = this.rawLine.match(this.addressRegex);
        this.gCodes = lodash_es_1.default(this.rawAddresses)
            .filter(function (a) { return a.startsWith("G"); })
            .map(function (a) { return parseInt(a.slice(1)); })
            .value();
        this.addresses = lodash_es_1.default.map(this.rawAddresses, Address_1.Address.factory);
        lodash_es_1.default.forEach("ABCDEFHIJKLNOPQRSTUVWXYZ".split(""), function (ltr) {
            if (_this.hasAddress(ltr)) {
                var value = _this.getAddr(ltr).value;
                debug("setting this." + ltr + " to", value);
                _this[ltr] = value;
            }
        });
        this.mapAddressValuesToObj();
        this.comment = lib_1.extractors.commentExtractor(this.rawLine);
        this.blockSkip = lib_1.extractors.blockSkipExtractor(this.rawLine);
    }
    Block.prototype.G = function (code) {
        return this.gCodes.includes(code);
    };
    // public M(code: number): boolean {
    //   return this.mCodes.includes(code);
    // }
    Block.prototype.getPosition = function () {
        return {
            B: this.getAddress("B"),
            X: this.getAddress("X"),
            Y: this.getAddress("Y"),
            Z: this.getAddress("Z")
        };
    };
    Block.prototype.isStartOfCannedCycle = function () {
        var addresses = lodash_es_1.default(this.rawAddresses)
            .intersection(NcCodes_1.CANNED_CYCLE_START_CODES)
            .value();
        return addresses.length > 0;
    };
    Block.prototype.hasMovement = function () {
        if (lodash_es_1.default.difference(this.gCodes, [4, 10, 65])) {
            return false;
        }
        return (lodash_es_1.default.isNumber(this.B) ||
            lodash_es_1.default.isNumber(this.X) ||
            lodash_es_1.default.isNumber(this.Y) ||
            lodash_es_1.default.isNumber(this.Z));
    };
    Block.prototype.hasAddress = function (ltr) {
        return lodash_es_1.default.some(this.addresses, ["ltr", ltr]);
    };
    Block.prototype.getAddress = function (addrPrefix) {
        if (this.hasAddress(addrPrefix)) {
            return this.getAddr(addrPrefix).value;
        }
        return null;
    };
    Block.prototype.getAddr = function (addrPrefix) {
        if (this.hasAddress(addrPrefix)) {
            return lodash_es_1.default.find(this.addresses, ["prefix", addrPrefix]);
        }
        return {
            prefix: undefined,
            value: undefined
        };
    };
    Block.prototype.mapAddressValuesToObj = function () {
        var _this = this;
        // Map found G & M addresses to true on the block
        lodash_es_1.default.forEach(this.rawAddresses, function (addr) {
            if (addr[0] === "G" || addr[0] === "M") {
                if (parseInt(addr.slice(1)) < 10) {
                    _this[lib_1.zeroPadAddress(addr)] = true;
                }
                else {
                    _this[addr] = true;
                }
            }
        });
        // Map all found Letter addresses to their cast values on the block
        lodash_es_1.default.forEach("ABCDEFHIJKLNOPQRSTUVWXYZ".split(""), function (ltr) {
            if (_this.hasAddress(ltr)) {
                _this[ltr] = _this.getAddr(ltr).value;
            }
        });
    };
    return Block;
}());
exports.Block = Block;
