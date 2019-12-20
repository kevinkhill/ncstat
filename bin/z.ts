import fs from "fs";
import { each, filter, min, uniq } from "lodash/fp";
import path from "path";

async function getDeepestZ(filepath: string): Promise<number> {
  const abspath = path.resolve(filepath);
  const buffer = await fs.promises.readFile(abspath);
  const lines = filter(l => l !== " ", buffer.toString());
  const z: number[] = [];
  const zRegex = /Z(-[0-9.]+)\s/g;

  each(line => {
    const m = zRegex.exec(line);

    if (m) {
      z.push(parseFloat(m[1]));
    }
  }, lines);

  return min(uniq(z)) ?? NaN;
}

const res = getDeepestZ(process.argv[1]);

console.log(res);
