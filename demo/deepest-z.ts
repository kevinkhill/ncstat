import { each, filter, min, uniq } from "lodash/fp";
import { argv } from 'process';

import { NcFile } from "../src/NcFile";

const contents = argv[1];
const lines = filter(l => l !== " ", contents.split("\n"));
const z: number[] = [];
const zRegex = /Z(-[0-9.]+)\s/g;

each(line => {
  const m = zRegex.exec(line);

  if (m) {
    z.push(parseFloat(m[1]));
  }
}, lines);

console.log(min(uniq(z)));
