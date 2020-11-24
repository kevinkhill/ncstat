import { NcToken } from "../NcLexer";
import { MovementEvent } from "../types/machine";
import { Address } from "./lib";
import { NcBlock } from "./NcBlock";

export type DataEvents = {
  error: Error;
  token: NcToken;
  mCode: Address;
  block: NcBlock;
  stateChange: any;
  movement: MovementEvent;
};

export type PlainEvents = "eob" | "eof";
