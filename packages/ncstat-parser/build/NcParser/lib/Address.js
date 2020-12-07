"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const NcLexer_1 = require("../../NcLexer");
const NcSpec_1 = require("../../NcSpec");
const types_1 = require("../../types");
const helpers_1 = require("./helpers");
class Address {
    constructor(prefix, value) {
        this.value = value;
        this.prefix = prefix;
    }
    static fromString(address) {
        const { prefix, value } = helpers_1.splitParse(address);
        return new Address(prefix, value);
    }
    static fromToken(token) {
        if (token.type !== types_1.Tokens.ADDRESS) {
            throw Error(`Token must be of type "ADDR"`);
        }
        NcLexer_1.assertIsAddressToken(token);
        return new Address(token.prefix, token.value);
    }
    get definition() {
        return NcSpec_1.getDefinition(this);
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
//# sourceMappingURL=Address.js.map