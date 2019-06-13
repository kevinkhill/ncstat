"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Address = /** @class */ (function () {
    function Address(valAddr) {
        this.prefix = valAddr[0];
        this.value = valAddr.includes(".")
            ? parseFloat(valAddr.slice(1))
            : parseInt(valAddr.slice(1));
    }
    Address.factory = function (addr) {
        return new Address(addr);
    };
    Address.prototype.toString = function () {
        return "" + this.prefix + this.value;
    };
    Address.prototype.isPositive = function () {
        return this.value > 0;
    };
    Address.prototype.isZero = function () {
        return this.value === 0;
    };
    Address.prototype.isNegative = function () {
        return this.value < 0;
    };
    return Address;
}());
exports.Address = Address;
