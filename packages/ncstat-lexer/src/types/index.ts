export * from "./tokens";

export interface LexerConfig {
  debug: boolean;
  newlines: boolean;
}

export interface Address {
  value: number;
  prefix: string;
}
