"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = require("javascript-state-machine");
var BaseProgram_1 = require("./BaseProgram");
var Program = StateMachine.factory(BaseProgram_1.BaseProgram, {
    init: "idle",
    transitions: [
        { name: "start-toolpath", from: "idle", to: "toolpathing" },
        { name: "end-toolpath", from: "toolpathing", to: "idle" },
        { name: "start-canned-cycle", from: "toolpathing", to: "in-canned-cycle" },
        { name: "end-canned-cycle", from: "in-canned-cycle", to: "toolpathing" }
    ]
});
exports.Program = Program;
