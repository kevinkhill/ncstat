"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = void 0;
const lib_1 = require("../../lib");
const debug = lib_1.makeDebugger("parser:tool");
class Tool {
    constructor(number = 0, desc = "") {
        this.number = number;
        this.desc = desc;
        this.number = number;
        this.desc = desc;
        debug(this.toString());
    }
    static create({ number, desc }) {
        return new Tool(number, desc);
    }
    getToolInfo() {
        return [this.number, this];
    }
    toString() {
        return `T${this.number} | ${this.desc}`;
    }
}
exports.Tool = Tool;
//# sourceMappingURL=Tool.js.map