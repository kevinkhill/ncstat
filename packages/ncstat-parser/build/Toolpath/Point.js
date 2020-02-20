"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

// import { Block } from "./Block";
class Point {
  // static fromBlock(block: Block): Point {
  //   return new Point({
  //     X: block.values.X,
  //     Y: block.values.Y,
  //     Z: block.values.Z
  //   });
  // }
  constructor({ X, Y, Z }) {
    this.X = void 0;
    this.Y = void 0;
    this.Z = void 0;
    this.X = X;
    this.Y = Y;
    this.Z = Z;
  }
}

exports.Point = Point;
