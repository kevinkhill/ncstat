// import { keyBy } from "lodash/fp";

import { getTokens } from "./getTokens";

export function getBlocks(
  input: string,
  debug = false
): Generator<Block> {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function* blocks() {
    const tokens = getTokens(input, debug);

    let line = [];

    for (const token of tokens) {
      if (token.type === "EOB") {
        yield line;

        line = [];
      } else {
        line.push(token);
      }
    }
  }

  return blocks();
}
