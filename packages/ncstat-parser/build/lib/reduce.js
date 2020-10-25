"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeBlockReducer = makeBlockReducer;

function makeBlockReducer(blocks) {
  const initial = [];
  return reducer => blocks.reduce(reducer, initial);
}
