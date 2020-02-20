"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CannedCycle = exports.START_CODES = exports.RETRACT_CODES = void 0;
const RETRACT_CODES = ["G98", "G99"];
exports.RETRACT_CODES = RETRACT_CODES;
const START_CODES = [
  "G73",
  "G74",
  "G81",
  "G82",
  "G83",
  "G84",
  "G85",
  "G86",
  "G87"
];
exports.START_CODES = START_CODES;

class CannedCycle {
  static fromBlock(block) {
    if (!block.isStartOfCannedCycle) {
      throw Error(
        "The provided Block is not the start of a CannedCycle."
      );
    }

    return new CannedCycle({
      Q: block.Q,
      Z: block.Z,
      R: block.R,
      F: block.F,
      retractCommand: block.retractCode,
      cycleCommand: block.cannedCycleStartCode
    });
  }

  constructor(config) {
    this.Z = void 0;
    this.R = void 0;
    this.F = void 0;
    this.cycleCommand = void 0;
    this.retractCommand = void 0;
    this.Q = void 0;
    this.I = void 0;
    this.J = void 0;
    this.K = void 0;
    this.points = [];
    this.Z = config.Z;
    this.R = config.R;
    this.F = config.F;
    this.cycleCommand = config.cycleCommand;
    this.retractCommand = config.retractCommand;
    this.Q = config === null || config === void 0 ? void 0 : config.Q;
  }

  getPeck() {
    return this.Q;
  }

  getDepth() {
    return this.Z;
  }

  getRetract() {
    return this.R;
  }

  getFeedrate() {
    return this.F;
  }

  addPoint(obj) {
    this.points.push(obj);
  }

  getPoints() {
    return this.points;
  }

  getPointCount() {
    return this.points.length;
  }
}

exports.CannedCycle = CannedCycle;
CannedCycle.START_CODES = START_CODES;
CannedCycle.RETRACT_CODES = RETRACT_CODES;
