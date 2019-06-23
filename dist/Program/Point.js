var Point = (function () {
    function Point(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.X = x;
        this.Y = y;
        this.Z = z;
    }
    return Point;
}());
export default Point;
