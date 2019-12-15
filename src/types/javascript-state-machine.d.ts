import { StateMachine } from "javascript-state-machine";

declare module "javscript-state-machine" {
  namespace StateMachine {
    function StateMachine(): typeof StateMachine;
  }
}
