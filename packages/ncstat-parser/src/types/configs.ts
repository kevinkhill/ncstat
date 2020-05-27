import { TokenType } from "./tokens";

export interface NcLexerConfig {
  debug: boolean;
  tokens: Partial<Record<TokenType, boolean>>;
}

export interface NcParserConfig {
  debug: boolean;
  lexerConfig: Partial<NcLexerConfig>;
}
