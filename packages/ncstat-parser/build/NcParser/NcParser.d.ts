import { NcLexer, NcTokens } from "@ncstat/lexer";
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
    toolpaths: Toolpath[];
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
    constructor({ debug }: {
        debug?: boolean;
    });
    toString(): string;
    getLexer(): NcLexer;
    getLimits(): Partial<AxesLimits>;
    get toolpathCount(): number;
    getToolPathsWithTools(): Toolpath[];
    tokenize(input: string): NcTokens;
    parse(source: string): NcProgram;
}
//# sourceMappingURL=NcParser.d.ts.map