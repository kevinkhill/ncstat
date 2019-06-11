"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var NcCodes_1 = require("../NcCodes");
var blockSkipRegex = /(^\/[0-9]?)/;
var commentRegex = /\(\s?(.+)\s?\)/;
var addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;
function zeroPadAddress(str) {
    return str ? str[0] + ("00" + str.slice(1)).slice(-2) : "";
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
        return {
            B: this.getAddress("B"),
            X: this.getAddress("X"),
            Y: this.getAddress("Y"),
            Z: this.getAddress("Z")
        };
    };
    Block.prototype.isStartOfCannedCycle = function () {
        return this.getCannedCycleStartCode() != null;
    };
    Block.prototype.hasMovement = function () {
        if (this.G10 === true || this.G04 === true || this.G65 === true) {
            return false;
        }
        return (_.isNumber(this.B) ||
            _.isNumber(this.X) ||
            _.isNumber(this.Y) ||
            _.isNumber(this.Z));
    };
    Block.prototype.hasAddress = function (ltr) {
        return _.find(this.addresses, function (address) { return address[0] === ltr; }) !== undefined;
    };
    Block.prototype.getAddress = function (ltr) {
        if (this.hasAddress(ltr)) {
            var code = _.find(this.addresses, function (address) { return address[0] === ltr; });
            var value = code.slice(1);
            return code.indexOf(".") > -1 ? parseFloat(value) : parseInt(value);
        }
        return null;
    };
    Block.prototype.getCannedCycleStartCode = function () {
        var cycle = _.intersection(this.addresses, NcCodes_1.CANNED_CYCLE_START_CODES);
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
                _this[ltr] = _this.getAddress(ltr);
            }
        });
    };
    return Block;
}());
exports.Block = Block;
