import { Token } from "ts-tokenizr";

// import { ValueToken } from "@/types";

export class NcToken extends Token {
  prefix: string = "";

  static from(token: Token): NcToken {
    return new NcToken(token);
  }

  constructor(token: Token) {
    super(
      token.type,
      token.value,
      token.text,
      token.pos,
      token.line,
      token.column
    );

    if (token.type === "ADDR") {
      const { value } = token;

      this.prefix = value.prefix;
      this.value = value.value;
    }
  }
}
