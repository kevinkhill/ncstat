"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcEventEmitter = void 0;

var _eventemitter = require("eventemitter3");

/* eslint-disable @typescript-eslint/explicit-function-return-type */
// export interface StateChange {
//   prev: NcMachineContext;
//   curr: NcMachineStates;
// }
class NcEventEmitter extends _eventemitter.EventEmitter {
  $emitEndOfBlock() {
    this.emit("eob");
  }

  $emitEndOfFile() {
    this.emit("eof");
  }

  $emitToken(token) {
    this.emit("token", token);
  } // @TODO type this

  $emitStateChange(state) {
    this.emit("stateChange", state);
  }

  $emitError(error) {
    this.emit("error", error);
  }
}

exports.NcEventEmitter = NcEventEmitter;
