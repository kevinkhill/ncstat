"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var NcCodes_1 = require("../NcCodes");
var Position_1 = require("./Position");
var blockSkipRegex = /(^\/[0-9]?)/;
var commentRegex = /\(\s?(.+)\s?\)/;
var addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;
function zeroPadAddress(str) {
    return (str ? str[0] + ("00" + str.slice(1)).slice(-2) : "");
}
var Block = /** @class */ (function () {
    function Block(line) {
        this.rawLine = line;
        this.comment = null;
        this.blockSkip = null;
        this.addresses = this.rawLine.match(addressRegex) || [];
        this._mapAddressValuesToObj();
        if (blockSkipRegex.test(this.rawLine)) {
            var match = this.rawLine.match(blockSkipRegex);
            if (match) {
                this.blockSkip = match[1];
            }
        }
        if (commentRegex.test(this.rawLine)) {
            var match = this.rawLine.match(commentRegex);
            if (match) {
                this.comment = match[1];
            }
        }
    }
    Block.prototype.getPosition = function () {
        return new Position_1.default(this);
    };
    Block.prototype.isStartOfCannedCycle = function () {
        return this.getCannedCycleStartCode() != null;
    };
    Block.prototype.hasMovement = function () {
        if (this.G10 === true || this.G04 === true || this.G65 === true) {
            return false;
        }
        return lodash_1.isNumber(this.B) || lodash_1.isNumber(this.X) || lodash_1.isNumber(this.Y) || lodash_1.isNumber(this.Z);
    };
    Block.prototype.hasAddress = function (ltr) {
        return lodash_1.find(this.addresses, function (address) { return address[0] === ltr; }) !== undefined;
    };
    Block.prototype.getAddress = function (ltr, cast) {
        if (cast === void 0) { cast = true; }
        if (this.hasAddress(ltr)) {
            var code = lodash_1.find(this.addresses, function (address) { return address[0] === ltr; });
            if (code) {
                var value = code.slice(1);
                if (cast) {
                    return code.indexOf(".") > -1 ? parseFloat(value) : parseInt(value);
                }
                return code;
            }
        }
        return null;
    };
    Block.prototype.getCannedCycleStartCode = function () {
        var cycle = lodash_1.intersection(this.addresses, NcCodes_1.CANNED_CYCLE_START_CODES);
        return cycle.length > 0 ? cycle[0] : null;
    };
    Block.prototype._mapAddressValuesToObj = function () {
        var _this = this;
        // Map found G & M addresses to true on the block
        this.addresses.forEach(function (addr) {
            if (addr[0] === "G" || addr[0] === "M") {
                if (parseInt(addr.slice(1)) < 10) {
                    _this[zeroPadAddress(addr)] = true;
                }
                else {
                    _this[addr] = true;
                }
            }
        });
        // Map all found Letter addresses to their cast values on the block
        "ABCDEFHIJKLNOPQRSTUVWXYZ".split("").forEach(function (ltr) {
            if (_this.hasAddress(ltr)) {
                _this[ltr] = _this.getAddress(ltr, true);
            }
        });
    };
    return Block;
}());
exports.default = Block;
