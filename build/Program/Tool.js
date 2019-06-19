"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tool = (function () {
    function Tool(block) {
        this.num = block.values.N;
        this.desc = block.getComment();
    }
    Tool.prototype.toString = function () {
        return "T" + this.num + " | " + this.desc;
    };
    return Tool;
}());
exports.default = Tool;
//# sourceMappingURL=Tool.js.map