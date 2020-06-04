/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EventEmitter } from "eventemitter3";

import { NcToken } from "@/NcLexer";
import { MovementEvent } from "@/types/machine";

import { NcBlock } from "./NcBlock";

export type NcEvents =
  | "eob"
  | "eof"
  | "token"
  | "block"
  | "error"
  | "movement"
  | "stateChange";

// export interface StateChange {
//   prev: NcMachineContext;
//   curr: NcMachineStates;
// }

export class NcEventEmitter extends EventEmitter {
  protected $emitEndOfBlock() {
    this.emit<NcEvents>("eob");
  }

  protected $emitMovement(movement: MovementEvent) {
    this.emit<NcEvents>("movement", movement);
  }

  protected $emitEndOfFile() {
    this.emit<NcEvents>("eof");
  }

  protected $emitBlock(block: NcBlock) {
    this.emit<NcEvents>("block", block);
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
