import Emittery from "emittery";
import { NcLexer } from "../NcLexer";
import { NcProgram } from "../NcProgram";
import { NcParserConfig } from "../types";
import { DataEvents, PlainEvents } from "./NcParserEvents";
/**
 * NcParser Class
 */
export declare class NcParser extends Emittery.Typed<DataEvents, PlainEvents> {
    static readonly defaults: {
        debug: boolean;
        lexerConfig: {
            debug: boolean;
            tokens: {
                NEWLINE: boolean;
                EOF: boolean;
            };
        };
    };
    config: NcParserConfig;
    private lexer;
    private program;
    private machine;
    private state;
    private currToolpath;
    private currBlock;
    private prevBlock;
    private currPosition;
    private prevPosition;
    private modals;
    constructor(config?: Partial<NcParserConfig>);
    getLexer(): NcLexer;
    parse(source: string): NcProgram;
    private yieldBlocks;
    private updateModals;
    private setProgramName;
    private startCannedCycle;
    private updatePosition;
}
//# sourceMappingURL=NcParser.d.ts.map