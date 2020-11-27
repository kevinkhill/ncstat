"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHmcOffsets = exports.createVmcOffsets = void 0;
function createVmcOffsets() {
    const zeros = { X: 0, Y: 0, Z: 0 };
    return {
        53: zeros,
        54: zeros,
        55: zeros,
        56: zeros,
        57: zeros,
        58: zeros,
        59: zeros
    };
}
exports.createVmcOffsets = createVmcOffsets;
function createHmcOffsets() {
    const zeros = { X: 0, Y: 0, Z: 0, B: 0 };
    return {
        53: zeros,
        54: zeros,
        55: zeros,
        56: zeros,
        57: zeros,
        58: zeros,
        59: zeros
    };
}
exports.createHmcOffsets = createHmcOffsets;
//# sourceMappingURL=offsets.js.map