import { Token } from "ts-tokenizr";

import { makeDebugger } from "../lib";
import {
  ParsedTokenizrValue,
  Tokens,
  TokenTypes,
  TokenValue
} from "../types";

const debug = makeDebugger("lexer:token");

export class NcToken {
  type: TokenTypes;
  text: string;
  pos: number;
  line: number;
  column: number;
  value: TokenValue;

  prefix!: string;

  private _token: Token;

  // get prefix(): string {
  //   return this.value?.prefix ?? "";
  // }

  static from(token: Token): NcToken {
    return new NcToken(token);
  }

  constructor(token: Token) {
    this._token = token;

    this.pos = this._token.pos;
    this.text = this._token.text;
    this.line = this._token.line;
    this.column = this._token.column;
    this.type = this._token.type as TokenTypes;
    this.value = this._token.value as TokenValue;

    if (this._token.type === Tokens.ADDRESS) {
      const value = this._token.value as ParsedTokenizrValue;

      this.prefix = value.prefix;
      this.value = parseFloat(value.value);
    }

    if (this._token.type === Tokens.M_CODE) {
      this.prefix = "M";
      this.value = this._token.value as number;
    }

    if (this._token.type === Tokens.PRG_NUMBER) {
      this.prefix = "O";
      this.value = this._token.value as number;
    }

    debug("%s %o", this.type, this.text);
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

  isA(type: TokenTypes, prefix?: string): boolean;
  isA(type: Tokens.ADDRESS, prefix: string): boolean {
    if (type !== this.type) {
      return false;
    }

    if (prefix && prefix !== this.value) {
      return false;
    }

    return true;
  }
}
