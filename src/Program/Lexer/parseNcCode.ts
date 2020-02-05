import { Linear } from "doublie";
import { clone } from "lodash/fp";

// import { Block } from "../../Toolpath/Block";
import { getTokens } from "./getTokens";

export function parseNcCode(input: string, debug = false): any {
  const tokens = getTokens(input, debug);
  const program = new Linear();

  let line = [];

  for (const token of tokens) {
    if (token.type === "EOB") {
      program.append(clone(line));

      line = [];
    } else {
      line.push(token);
    }
  }

  return program;
}
