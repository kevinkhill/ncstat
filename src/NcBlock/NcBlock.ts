import { map } from "lodash/fp";

import { NcToken } from "../NcLexer";

export class NcBlock {
  constructor(public tokens: NcToken[]) {
    this.tokens = tokens;
  }

  toString(): string {
    return map("text", this.tokens).join(" ");
  }
}
