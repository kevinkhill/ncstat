"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODALS = {
    RAPID: "G00",
    FEED: "G01",
    ABSOLUTE: "G90",
    INCREMENTAL: "G91",
};
var Position = /** @class */ (function () {
    function Position(block) {
        var _this = this;
        this.B = 0;
        this.X = 0;
        this.Y = 0;
        this.Z = 0;
        if (block) {
            ["B", "X", "Y", "Z"].forEach(function (axis) {
                if (block.hasAddress(axis)) {
                    _this[axis] = block.getAddress(axis);
                }
            });
        }
    }
    return Position;
}());
exports.default = Position;
