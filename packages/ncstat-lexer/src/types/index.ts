import { TokenType } from "./tokens";

export * from "./tokens";

export interface LexerConfig {
  debug: boolean;
  tokens: Partial<
    {
      [K in TokenType]: boolean;
    }
  >;
}

// | Partial<Record<TokenType, boolean>>
