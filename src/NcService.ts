import { createMachine, interpret } from "@xstate/fsm";

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

export const NcService = interpret(NcStateMachine).start();

NcService.subscribe(state => {
  console.log(state.value);
});

NcService.send("START_TOOLPATH");
NcService.send("START_CANNED_CYCLE");
NcService.send("END_CANNED_CYCLE");
NcService.send("START_CANNED_CYCLE");
NcService.send("END_CANNED_CYCLE");
NcService.send("END_TOOLPATH");
NcService.stop();
