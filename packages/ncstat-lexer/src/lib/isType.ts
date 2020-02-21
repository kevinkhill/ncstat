import { NcToken, TokenType } from "../types";

export function isType(type: TokenType, token: NcToken): boolean {
  return token.type === type;
}
