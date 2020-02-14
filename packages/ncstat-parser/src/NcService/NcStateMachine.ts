import { createMachine } from "@xstate/fsm";

import { Events } from "./events";
import { States } from "./states";

export const NcStateMachine = createMachine({
  id: "ncstat",
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
