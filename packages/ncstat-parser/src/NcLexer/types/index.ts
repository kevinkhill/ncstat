import { TokenType } from "./tokens";

export * from "./tokens";

export interface LexerConfig {
  debug: boolean;
  tokens: Partial<Record<TokenType, boolean>>;
}

// | Partial<Record<TokenType, boolean>>
