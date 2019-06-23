import Debug from "debug";
import _ from "lodash";
import { blockSkipExtractor, commentExtractor } from "../lib";
import { CANNED_CYCLE } from "../NcCodes";
import Address from "./Address";
var log = Debug("nc-scanner");
var Block = (function () {
    function Block(rawLine) {
        var _this = this;
        this.rawLine = rawLine;
        this.values = {};
        this.blockSkip = null;
        this.gCodes = [];
        this.mCodes = [];
        this.addresses = [];
        this.rawAddresses = [];
        this.comment = null;
        this.addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;
        this.rawAddresses = this.rawLine.match(this.addressRegex);
        if (this.rawAddresses) {
            this.addresses = this.rawAddresses.map(Address.factory);
            this.rawAddresses.forEach(function (a) {
                var num = parseInt(a.slice(1));
                if (a.startsWith("G")) {
                    _this.gCodes.push(num);
                }
                if (a.startsWith("M")) {
                    _this.mCodes.push(num);
                }
            });
            this.addresses.forEach(function (address) {
                _this.values[address.prefix] = address.value;
            });
        }
        this.comment = commentExtractor(this.rawLine);
        this.blockSkip = blockSkipExtractor(this.rawLine);
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
        return _(this.rawAddresses)
            .intersection(CANNED_CYCLE.RETRACT_CODES)
            .first();
    };
    Block.prototype.isStartOfCannedCycle = function () {
        var addresses = _(this.rawAddresses)
            .intersection(CANNED_CYCLE.START_CODES)
            .value();
        return addresses.length > 0;
    };
    Block.prototype.getCannedCycleStartCode = function () {
        return _(this.rawAddresses)
            .intersection(CANNED_CYCLE.START_CODES)
            .first();
    };
    Block.prototype.hasMovement = function () {
        if (_.intersection(this.gCodes, [4, 10, 65]).length > 0) {
            return false;
        }
        return (_.isNumber(this.values.B) ||
            _.isNumber(this.values.X) ||
            _.isNumber(this.values.Y) ||
            _.isNumber(this.values.Z));
    };
    Block.prototype.hasAddress = function (ltr) {
        return this.values.hasOwnProperty(ltr);
    };
    Block.prototype.getValue = function (prefix) {
        return this.hasAddress(prefix) ? this.values[prefix] : null;
    };
    Block.prototype.getAddr = function (addrPrefix) {
        if (this.hasAddress(addrPrefix)) {
            return _.find(this.addresses, ["prefix", addrPrefix]);
        }
        return {
            prefix: undefined,
            value: undefined
        };
    };
    return Block;
}());
export default Block;
//# sourceMappingURL=Block.js.map