/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EventEmitter } from "eventemitter3";

import { NcToken } from "@/NcLexer";

export type NcEvents =
  | "eob"
  | "eof"
  | "token"
  | "error"
  | "stateChange";

// export interface StateChange {
//   prev: NcMachineContext;
//   curr: NcMachineStates;
// }

export class NcEventEmitter extends EventEmitter {
  protected $emitEndOfBlock() {
    this.emit<NcEvents>("eob");
  }

  protected $emitEndOfFile() {
    this.emit<NcEvents>("eof");
  }

  protected $emitToken(token: NcToken) {
    this.emit<NcEvents>("token", token);
  }

  // @TODO type this
  protected $emitStateChange(state: any) {
    this.emit<NcEvents>("stateChange", state);
  }

  protected $emitError(error: Error) {
    this.emit<NcEvents>("error", error);
  }
}
