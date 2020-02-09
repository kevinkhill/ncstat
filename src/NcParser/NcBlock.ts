import { NcToken } from "../NcLexer";

export class NcBlock {
  constructor(public tokens: NcToken[]) {
    this.tokens = tokens;
  }

  toString(): string {
    let out = "[ ";

    this.tokens.forEach(token => {
      out += `<${token.text}> `;
    });

    return `${out}]`;
  }
}
