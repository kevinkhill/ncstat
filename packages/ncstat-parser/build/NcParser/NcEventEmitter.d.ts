import { EventEmitter } from "eventemitter3";
import { NcToken } from "@ncstat/lexer";
export declare type NcEvents = "eob" | "eof" | "token" | "error" | "stateChange";
export declare class NcEventEmitter extends EventEmitter {
    protected $emitEndOfBlock(): void;
    protected $emitEndOfFile(): void;
    protected $emitToken(token: NcToken): void;
    protected $emitStateChange(state: any): void;
    protected $emitError(error: Error): void;
}
//# sourceMappingURL=NcEventEmitter.d.ts.map