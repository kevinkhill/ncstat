import _ from "lodash";
var Address = (function () {
    function Address(valAddr) {
        this.prefix = valAddr[0];
        this.value = valAddr.includes(".")
            ? parseFloat(valAddr.slice(1))
            : parseInt(valAddr.slice(1));
    }
    Address.factory = function (valAddr) {
        return new Address(valAddr);
    };
    Address.prototype.toString = function () {
        return "" + this.prefix + this.value;
    };
    Address.prototype.matches = function (valAddr) {
        return _.isEqual(this, new Address(valAddr));
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
export default Address;
