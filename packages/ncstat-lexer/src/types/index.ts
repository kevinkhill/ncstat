import { TokenType } from "./tokens";

export * from "./tokens";

export interface LexerConfig {
  debug: boolean;
  tokens: {
    [K in TokenType]: boolean;
  } &
    Partial<Record<TokenType, boolean>>;
}

// | Partial<Record<TokenType, boolean>>
