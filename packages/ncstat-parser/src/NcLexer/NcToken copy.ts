import { Token } from "ts-tokenizr";

import { ParsedTokenizrValue, TokenTypes } from "@/types";
import { Tokens, TokenValue } from "@/types/tokens";

export class NcToken {
  type: TokenTypes;
  value: TokenValue;
  text: string;
  pos: number;
  line: number;
  column: number;
  prefix?: string;

  static from(token: Token): NcToken {
    return new NcToken(token);
  }

  constructor(token: Token) {
    this.type = token.type as TokenTypes;
    this.value = token.value as TokenValue;
    this.text = token.text;
    this.pos = token.pos;
    this.line = token.line;
    this.column = token.column;

    if (token.type === Tokens.ADDRESS) {
      const value = token.value as ParsedTokenizrValue;

      this.prefix = value.prefix;
      this.value = value.value;
    }
  }

  toString(): string {
    const tokenAttr = [
      `type: ${this.type}`,
      `value: ${JSON.stringify(this.value)}`,
      `text: ${JSON.stringify(this.text)}`,
      `pos: ${this.pos}`,
      `line: ${this.line}`,
      `column: ${this.column}`
    ].join(", ");

    return `<${tokenAttr}>`;
  }

  isA(type: TokenTypes, prefix?: string): boolean {
    if (type !== this.type) {
      return false;
    }

    if (prefix && prefix !== this.value) {
      return false;
    }

    return true;
  }
}
