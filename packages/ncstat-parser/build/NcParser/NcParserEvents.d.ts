import { NcToken } from "../NcLexer";
import { MovementEvent } from "../types/machine";
import { Address } from "./lib";
import { NcBlock } from "./NcBlock";
export declare type DataEvents = {
    error: Error;
    token: NcToken;
    mCode: Address;
    block: NcBlock;
    stateChange: any;
    movement: MovementEvent;
};
export declare type PlainEvents = "eob" | "eof";
//# sourceMappingURL=NcParserEvents.d.ts.map