import { NcTokens, LexerConfig } from "./types";
export declare class NcLexer {
    debug: boolean;
    private lexer;
    constructor({ debug }: Partial<LexerConfig>);
    tokenize(input: string): NcTokens;
}
//# sourceMappingURL=NcLexer.d.ts.map