/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EventEmitter } from "eventemitter3";

import { NcToken } from "NcLexer";
import { NcMachineStates } from "NcService";

export const enum NcEvents {
  EOB = "eob",
  EOF = "eof",
  TOKEN = "token",
  ERROR = "error",
  STATE_CHANGE = "stateChange"
}

export class NcEventEmitter extends EventEmitter {
  protected $emitEndOfBlock() {
    this.emit(NcEvents.EOB);
  }

  protected $emitEndOfFile() {
    this.emit(NcEvents.EOF);
  }

  protected $emitToken(token: NcToken) {
    this.emit(NcEvents.TOKEN, token);
  }

  protected $emitStateChange(state: {
    prev: NcMachineStates;
    curr: NcMachineStates;
  }) {
    this.emit(NcEvents.STATE_CHANGE, state);
  }

  protected $emitError(error: Error) {
    this.emit(NcEvents.ERROR, error);
  }
}
