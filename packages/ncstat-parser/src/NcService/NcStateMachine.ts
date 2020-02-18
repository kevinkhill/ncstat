import { Machine } from "xstate";

export enum NcMachineState {
  IDLE = "IDLE",
  TOOLPATHING = "TOOLPATHING",
  IN_CANNED_CYCLE = "IN_CANNED_CYCLE"
}

// export enum NcMachineEvent {
//   START_TOOLPATH = "START_TOOLPATH",
//   END_TOOLPATH = "END_TOOLPATH",
//   START_CANNED_CYCLE = "START_CANNED_CYCLE",
//   END_CANNED_CYCLE = "END_CANNED_CYCLE"
// }

export type NcMachineEvent =
  { type : "START_TOOLPATH"} |
  { type : "END_TOOLPATH"} |
  { type : "START_CANNED_CYCLE"} |
  { type : "END_CANNED_CYCLE"}

export type NcMachineEventType =
  "START_TOOLPATH" |
  "END_TOOLPATH" |
  "START_CANNED_CYCLE" |
  "END_CANNED_CYCLE";

export interface NcMachineStateSchema {
  states: {
    IDLE: {},
    TOOLPATHING: {},
    IN_CANNED_CYCLE: {}
  }
}

export interface NcMachineContext {
  position: {
    curr: { X: number, Y: number, Z: number, B: number },
    prev: { X: number, Y: number, Z: number, B: number }
  }
};

export const NcStateMachine = Machine<NcMachineContext, NcMachineStateSchema, NcMachineEvent>({
  id: "ncstat",
  initial: "IDLE",
  context: {
    position: {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
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
