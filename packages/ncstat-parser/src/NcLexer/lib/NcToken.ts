import { Token } from "ts-tokenizr";

// import { ValueToken } from "@/types";

export default class NcToken extends Token {
  constructor(token: Token) {
    super(
      token.type,
      token.value,
      token.text,
      token.pos,
      token.line,
      token.column
    );
  }
}
