"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcService = void 0;

var _fsm = require("@xstate/fsm");

var _NcStateMachine = require("./NcStateMachine");

const NcService = (0, _fsm.interpret)(_NcStateMachine.NcStateMachine);
exports.NcService = NcService;
