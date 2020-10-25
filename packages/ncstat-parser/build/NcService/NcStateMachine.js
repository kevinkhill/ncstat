"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcStateMachine = exports.NcMachineState = void 0;

var _xstate = require("xstate");

const NcMachineState = {
  IDLE: "IDLE",
  TOOLPATHING: "TOOLPATHING",
  IN_CANNED_CYCLE: "IN_CANNED_CYCLE"
}; // export enum NcMachineEvent {
//   START_TOOLPATH = "START_TOOLPATH",
//   END_TOOLPATH = "END_TOOLPATH",
//   START_CANNED_CYCLE = "START_CANNED_CYCLE",
//   END_CANNED_CYCLE = "END_CANNED_CYCLE"
// }

exports.NcMachineState = NcMachineState;
const NcStateMachine = (0, _xstate.Machine)({
  id: "ncstat",
  initial: "IDLE",
  context: {
    position: {
      curr: {
        X: 0,
        Y: 0,
        Z: 0,
        B: 0
      },
      prev: {
        X: 0,
        Y: 0,
        Z: 0,
        B: 0
      }
    }
  },
  states: {
    IDLE: {
      on: {
        START_TOOLPATH: {
          target: "TOOLPATHING"
        }
      }
    },
    TOOLPATHING: {
      on: {
        END_TOOLPATH: "IDLE",
        START_CANNED_CYCLE: "IN_CANNED_CYCLE"
      }
    },
    IN_CANNED_CYCLE: {
      on: {
        END_TOOLPATH: "IDLE",
        END_CANNED_CYCLE: "TOOLPATHING"
      }
    }
  }
});
exports.NcStateMachine = NcStateMachine;
