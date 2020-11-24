"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mcode = void 0;
const lib_1 = require("../../lib");
const Address_1 = require("./Address");
const debug = lib_1.makeDebugger("parser:m-code");
class Mcode extends Address_1.Address {
    constructor(value) {
        super("M", value);
        this.prefix = "M";
        debug("%o", this.definition.desc);
    }
    get isPause() {
        return this.value === 0;
    }
    get isOpStop() {
        return this.value === 1;
    }
    get isEndOfProgram() {
        return this.value === 30;
    }
}
exports.Mcode = Mcode;
//# sourceMappingURL=Mcode.js.map