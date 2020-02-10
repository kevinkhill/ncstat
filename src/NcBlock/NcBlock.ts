import { invokeMap, prop } from "lodash/fp";

import { NcToken } from "../NcLexer";

export class NcBlock {
  constructor(public tokens: NcToken[]) {
    this.tokens = tokens;
  }

  toString(): string {
    return invokeMap(prop("text"), this.tokens).join(" ");
  }
}
