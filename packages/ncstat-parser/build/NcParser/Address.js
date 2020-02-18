"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zeroPadAddress = zeroPadAddress;
exports.Address = void 0;

/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
function zeroPadAddress(input) {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}

class Address {
  constructor(token) {
    var _token$value, _token$value2;

    this.prefix = void 0;
    this.value = void 0;

    if (token.type !== "ADDR") {
      throw Error(`Token must be of type "ADDR"`);
    }

    this.prefix =
      (_token$value = token.value) === null || _token$value === void 0
        ? void 0
        : _token$value.prefix;
    this.value =
      (_token$value2 = token.value) === null || _token$value2 === void 0
        ? void 0
        : _token$value2.value;
  }

  get isGcode() {
    return this.prefix === "G";
  }

  get isMcode() {
    return this.prefix === "M";
  }

  get isZero() {
    return this.value === 0;
  }

  get isPositive() {
    return this.value > 0;
  }

  get isNegative() {
    return this.value < 0;
  }

  toString() {
    return `${this.prefix}${this.value}`;
  }
}

exports.Address = Address;
