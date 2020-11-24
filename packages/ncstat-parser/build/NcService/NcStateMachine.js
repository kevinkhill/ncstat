"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcStateMachine = void 0;
const fsm_1 = require("@xstate/fsm");
exports.NcStateMachine = fsm_1.createMachine({
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
//# sourceMappingURL=NcStateMachine.js.map