"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcService = void 0;

var _xstate = require("xstate");

var _NcStateMachine = require("./NcStateMachine");

const NcService = (0, _xstate.interpret)(
  _NcStateMachine.NcStateMachine
);
exports.NcService = NcService;
