import { IToken } from "tokenizr";

const Token = Itoken<any>

export class NcToken extends Token {
  constructor(token: Token) {
    super(...token);
  }
}
