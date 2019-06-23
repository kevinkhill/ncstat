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
import Point from "./Point";
var CannedPoint = (function (_super) {
    __extends(CannedPoint, _super);
    function CannedPoint(block) {
        var _this = _super.call(this) || this;
        _this.Z = block.values.Z;
        _this.R = block.values.R;
        return _this;
    }
    return CannedPoint;
}(Point));
export default CannedPoint;
