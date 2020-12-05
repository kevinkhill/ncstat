"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcLexer = void 0;
const lib_1 = require("../lib");
const tokenizr_1 = require("./lib/tokenizr");
const NcToken_1 = require("./NcToken");
const debug = lib_1.makeDebugger("lexer");
// export class NcLexer extends Emittery.Typed<{ token: NcToken }> {
class NcLexer {
    constructor(config) {
        // super();
        this.tokenizr = tokenizr_1.tokenizr;
        this.config = Object.assign(Object.assign({}, NcLexer.defaults), config);
        debug("Config: %o", this.config);
    }
    /**
     * Sugar method for creating an array from
     * the tokenize generator method.
     */
    tokens(input) {
        const tokenGenerator = this.tokenize(input);
        return Array.from(tokenGenerator);
    }
    /**
     * @emits token NcToken
     */
    *tokenize(input) {
        let token;
        this.tokenizr.debug(this.config.debug);
        this.tokenizr.input(input);
        // debug("Tokenizing input");
        while ((token = this.getNextToken()) !== null) {
            if (token.isA("NEWLINE") && this.config.tokens.NEWLINE === false)
                continue;
            if (token.isA("EOF") && this.config.tokens.EOF === false)
                continue;
            // this.emit("token", token);
            yield token;
        }
    }
    /**
     * Wrap the generic Tokenizr token
     *
     * This is mostly to unpack token.value.value and token.value.prefix
     * onto the token itself.
     *
     * @TODO More methods on the token?
     */
    getNextToken() {
        const token = this.tokenizr.token();
        return token ? NcToken_1.NcToken.from(token) : null;
    }
}
exports.NcLexer = NcLexer;
NcLexer.defaults = {
    debug: false,
    tokens: {
        NEWLINE: true,
        EOF: false
    }
};
//# sourceMappingURL=NcLexer.js.map