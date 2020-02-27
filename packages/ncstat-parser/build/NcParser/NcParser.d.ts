import { NcLexer } from "@ncstat/lexer";
import { Toolpath } from "../Toolpath";
import { AxesLimits, NcBlocks, NcProgram } from "../types";
import { NcEventEmitter } from "./NcEventEmitter";
export declare class NcParser extends NcEventEmitter {
    /**
     * Settings
     */
    debug: boolean;
    /**
       Proram Vars
      */
    programNumber: number;
    programTitle: string;
    program: NcProgram;
    toolpaths: Array<Toolpath>;
    /**
     * Parser Vars
     */
    blocks: NcBlocks;
    /**
     * Internals
     */
    private nc;
    private state;
    private lexer;
    private tokens;
    constructor(config?: Partial<{
        debug: boolean;
    }>);
    toString(): string;
    getLexer(): NcLexer;
    getLimits(): Partial<AxesLimits>;
    get toolpathCount(): number;
    getToolPathsWithTools(): Array<Toolpath>;
    parse(source: string): NcProgram;
}
//# sourceMappingURL=NcParser.d.ts.map