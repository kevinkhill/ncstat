"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __importDefault(require("./Point"));
var CannedPoint = (function (_super) {
    __extends(CannedPoint, _super);
    function CannedPoint(block) {
        var _this = _super.call(this) || this;
        _this.Z = block.values.Z;
        _this.R = block.values.R;
        return _this;
    }
    return CannedPoint;
}(Point_1.default));
exports.default = CannedPoint;
//# sourceMappingURL=CannedPoint.js.map