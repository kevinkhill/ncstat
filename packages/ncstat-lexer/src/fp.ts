import { NcToken } from "./types/types";
import { tokenizer } from "./lib/tokenizer";rt function tokenize(input: string): Array<NcToken> {
  return tokenizer.input(input).tokens();
}
