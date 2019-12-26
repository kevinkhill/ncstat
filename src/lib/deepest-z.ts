import { each, min, uniq } from "lodash/fp";

import { Program } from "../Program";

export function getDeepestZ(program: Program): number | undefined {
  const lines = program.getLines();
  const z: number[] = [];
  const zRegex = /Z(-[0-9.]+)\s/g;

  each(line => {
    const m = zRegex.exec(line);

    if (m) {
      z.push(parseFloat(m[1]));
    }
  }, lines);

  return min(uniq(z));
}
