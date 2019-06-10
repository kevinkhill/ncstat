"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Machine_1 = require("../Machine");
exports.MODALS = {
    RAPID: 'G00',
    FEED: 'G01',
    ABSOLUTE: 'G90',
    INCREMENTAL: 'G91'
};
var Position = /** @class */ (function () {
    function Position(block) {
        var _this = this;
        this.B = 0;
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
        Machine_1.AXES.forEach(function (axis) {
            if (block[axis])
                _this[axis] = block[axis];
        });
    }
    return Position;
}());
exports.default = Position;
//# sourceMappingURL=Position.js.map