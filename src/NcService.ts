import { createMachine, interpret } from "@xstate/fsm";
import { eq } from "lodash/fp";

export const enum States {
  IDLE = "IDLE",
  TOOLPATHING = "TOOLPATHING",
  IN_CANNED_CYCLE = "IN_CANNED_CYCLE"
}

export const enum Events {
  START_TOOLPATH = "START_TOOLPATH",
  END_TOOLPATH = "END_TOOLPATH",
  START_CANNED_CYCLE = "START_CANNED_CYCLE",
  END_CANNED_CYCLE = "END_CANNED_CYCLE"
}

export const isIdle = eq(States.IDLE);
export const isToolpathing = eq(States.TOOLPATHING);
export const isInCannedCycle = eq(States.IN_CANNED_CYCLE);

export const NcStateMachine = createMachine({
  id: "nc",
  initial: States.IDLE,
  context: {
    position: {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    }
  },
  states: {
    [States.IDLE]: {
      on: {
        [Events.START_TOOLPATH]: {
          target: States.TOOLPATHING
        }
      }
    },
    [States.TOOLPATHING]: {
      on: {
        [Events.END_TOOLPATH]: States.IDLE,
        [Events.START_CANNED_CYCLE]: States.IN_CANNED_CYCLE
      }
    },
    [States.IN_CANNED_CYCLE]: {
      on: {
        [Events.END_TOOLPATH]: States.IDLE,
        [Events.END_CANNED_CYCLE]: States.TOOLPATHING
      }
    }
  }
});

export const NcService = interpret(NcStateMachine);
