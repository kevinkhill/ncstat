import StateMachine = require("javascript-state-machine");

import { BaseProgram } from "./BaseProgram";

const Program = StateMachine.factory(BaseProgram, {
  init: "idle",
  transitions: [
    { name: "start-toolpath", from: "idle", to: "toolpathing" },
    { name: "end-toolpath", from: "toolpathing", to: "idle" },
    { name: "start-canned-cycle", from: "toolpathing", to: "in-canned-cycle" },
    { name: "end-canned-cycle", from: "in-canned-cycle", to: "toolpathing" }
  ]
});

export { Program };
