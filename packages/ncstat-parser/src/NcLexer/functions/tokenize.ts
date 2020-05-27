import { NcLexer } from "../NcLexer";
import { ValueToken } from "../types";

/**
 * Tokenize a string with the standard NcLexer
 *
 * This function creates an instance of the
 * NcLexer and processes the string for tokens
 * with the default settings
 *
 * @example ```
 * const tokens = tokenize("G91 G28 Z0.");
 *
 * console.log(tokens.length); // 3
 * ```
 */
export function tokenize(input: string): Array<ValueToken> {
  const lexer = new NcLexer();

  return lexer.tokens(input);
}
