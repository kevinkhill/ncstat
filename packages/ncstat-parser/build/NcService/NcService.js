"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcService = void 0;
const fsm_1 = require("@xstate/fsm");
const NcStateMachine_1 = require("./NcStateMachine");
exports.NcService = fsm_1.interpret(NcStateMachine_1.NcStateMachine);
//# sourceMappingURL=NcService.js.map