import { NcLexerConfig } from "../types";
import { NcToken } from "./NcToken";
export declare class NcLexer {
    static readonly defaults: {
        debug: boolean;
        tokens: {
            NEWLINE: boolean;
            EOF: boolean;
        };
    };
    config: NcLexerConfig;
    private readonly tokenizr;
    constructor(config?: Partial<NcLexerConfig>);
    /**
     * Sugar method for creating an array from
     * the tokenize generator method.
     */
    tokens(input: string): NcToken[];
    /**
     * @emits token NcToken
     */
    tokenize(input: string): Generator<NcToken>;
    /**
     * Wrap the generic Tokenizr token
     *
     * This is mostly to unpack token.value.value and token.value.prefix
     * onto the token itself.
     *
     * @TODO More methods on the token?
     */
    private getNextToken;
}
//# sourceMappingURL=NcLexer.d.ts.map