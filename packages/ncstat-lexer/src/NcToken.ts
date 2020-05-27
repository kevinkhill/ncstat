import Tokenizer, { IToken } from "tokenizr";

export class NcToken extends Tokenizer.Token {
  constructor(token: IToken<unknown>) {
    super(
      token.type,
      token.value,
      token.text,
      token?.pos,
      token?.line,
      token?.column
    );
  }
}
