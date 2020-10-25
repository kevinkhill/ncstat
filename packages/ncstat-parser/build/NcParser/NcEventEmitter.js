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
// const debug = makeDebugger(`parser:event`);
class NcEventEmitter extends _eventemitter.EventEmitter {
  $emitEndOfBlock() {
    this.$emit("eob");
  }

  $emitMovement(movement) {
    this.$emit("movement", movement);
  }

  $emitM(mcode) {
    this.$emit("M", mcode);
  }

  $emitEndOfFile() {
    this.$emit("eof");
  }

  $emitBlock(block) {
    this.$emit("block", block);
  }

  $emitToken(token) {
    this.$emit("token", token);
  } // @TODO type this

  $emitStateChange(state) {
    this.$emit("stateChange", state);
  }

  $emitError(error) {
    this.$emit("error", error);
  }

  $emit(event, ...args) {
    // debug("Emitting: %o", event);
    // debug("Payload: %o", args);
    this.emit(event, ...args);
  }
}

exports.NcEventEmitter = NcEventEmitter;
