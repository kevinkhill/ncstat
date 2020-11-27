export interface NcMachineContext {
    position: {
        curr: {
            X: number;
            Y: number;
            Z: number;
            B: number;
        };
        prev: {
            X: number;
            Y: number;
            Z: number;
            B: number;
        };
    };
}
export declare type NcMachineEvent = {
    type: "START_TOOLPATH";
} | {
    type: "END_TOOLPATH";
} | {
    type: "START_CANNED_CYCLE";
} | {
    type: "END_CANNED_CYCLE";
};
export declare type NcMachineState = {
    value: "IDLE";
    context: NcMachineContext & {
        position: {
            curr: {
                X: undefined;
                Y: undefined;
                Z: undefined;
                B: undefined;
            };
            prev: {
                X: undefined;
                Y: undefined;
                Z: undefined;
                B: undefined;
            };
        };
    };
} | {
    value: "TOOLPATHING";
    context: NcMachineContext;
} | {
    value: "IN_CANNED_CYCLE";
    context: NcMachineContext;
};
export declare const NcStateMachine: import("@xstate/fsm").StateMachine.Machine<NcMachineContext, NcMachineEvent, NcMachineState>;
//# sourceMappingURL=NcStateMachine.d.ts.map