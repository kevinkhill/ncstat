"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVmcOffsets = createVmcOffsets;
exports.createHmcOffsets = createHmcOffsets;

function createVmcOffsets() {
  const zeros = {
    X: 0,
    Y: 0,
    Z: 0
  };
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

function createHmcOffsets() {
  const zeros = {
    X: 0,
    Y: 0,
    Z: 0,
    B: 0
  };
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
