import { EventEmitter } from "eventemitter3";
import { LexerConfig, NcToken } from "./types";
export declare class NcLexer extends EventEmitter {
    defaults: {
        debug: boolean;
        newlineTokens: boolean;
    };
    config: LexerConfig;
    private tokenizer;
    constructor(config?: Partial<LexerConfig>);
    tokenize(input: string): Generator<NcToken>;
    tokenArray(input: string): Array<NcToken>;
}
//# sourceMappingURL=NcLexer.d.ts.map