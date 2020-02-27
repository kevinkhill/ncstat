import { TokenizrToken } from "./types";

export class NcToken {
  constructor(private token: TokenizrToken) {
    this.token = token;
  }

  value(): number | string {
    return this.token.value?.value ?? this.token.value;
  }
}
