/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EventEmitter } from "eventemitter3";

import { makeDebugger } from "@/lib";
import { NcToken } from "@/NcLexer";
import { MovementEvent } from "@/types/machine";

import { Address } from "./lib";
import { NcBlock } from "./NcBlock";

export type NcEvents =
  | "M"
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

const debug = makeDebugger(`parser:event`);

export class NcEventEmitter extends EventEmitter {
  protected $emitEndOfBlock() {
    this.$emit("eob");
  }

  protected $emitMovement(movement: MovementEvent) {
    this.$emit("movement", movement);
  }

  protected $emitM(mcode: Address) {
    this.$emit("M", mcode);
  }

  protected $emitEndOfFile() {
    this.$emit("eof");
  }

  protected $emitBlock(block: NcBlock) {
    this.$emit("block", block);
  }

  protected $emitToken(token: NcToken) {
    this.$emit("token", token);
  }

  // @TODO type this
  protected $emitStateChange(state: any) {
    this.$emit("stateChange", state);
  }

  protected $emitError(error: Error) {
    this.$emit("error", error);
  }

  private $emit(event: NcEvents, ...args: unknown[]) {
    // debug("Emitting: %o", event);
    // debug("Payload: %o", args);

    this.emit<NcEvents>(event, ...args);
  }
}
