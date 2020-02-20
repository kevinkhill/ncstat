export declare type NcMachineStateType = "IDLE" | "TOOLPATHING" | "IN_CANNED_CYCLE";
export declare const NcMachineState: {
    IDLE: string;
    TOOLPATHING: string;
    IN_CANNED_CYCLE: string;
};
export declare type NcMachineEventType = "START_TOOLPATH" | "END_TOOLPATH" | "START_CANNED_CYCLE" | "END_CANNED_CYCLE";
export declare type NcMachineEvent = {
    type: "START_TOOLPATH";
} | {
    type: "END_TOOLPATH";
} | {
    type: "START_CANNED_CYCLE";
} | {
    type: "END_CANNED_CYCLE";
};
export interface NcMachineStateSchema {
    states: {
        IDLE: {};
        TOOLPATHING: {};
        IN_CANNED_CYCLE: {};
    };
}
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
export declare const NcStateMachine: import("xstate").StateMachine<NcMachineContext, NcMachineStateSchema, NcMachineEvent, any>;
//# sourceMappingURL=NcStateMachine.d.ts.map