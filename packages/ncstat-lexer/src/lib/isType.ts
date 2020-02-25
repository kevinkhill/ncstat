import { NcToken, TokenType } from "../types";

export const isType = (type: TokenType) => (
  token: NcToken
): boolean => {
  return token.type === type;
};
