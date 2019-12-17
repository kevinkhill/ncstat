import fs from "fs";
import { each, filter, min, uniq } from "lodash/fp";

import { NcFile } from "@/NcFile";

import { getTestNcFile } from "./helpers";

test("Manually scan a program for the largest negative Z address", async () => {
  const filepath = getTestNcFile("example2.NC");
  const buffer = await fs.promises.readFile(filepath);
  const contents = buffer.toString();
  const lines = filter(l => l !== " ", contents.split("\n"));
  const z: number[] = [];
  const zRegex = /Z(-[0-9.]+)\s/g;

  each(line => {
    const m = zRegex.exec(line);

    if (m) {
      z.push(parseFloat(m[1]));
    }
  }, lines);

  expect(lines).toHaveLength(444);
  expect(z).toHaveLength(24);
  expect(uniq(z)).toHaveLength(6);
  expect(min(uniq(z))).toBe(-0.8686);
});

test("Using the NcFile class, use method to find the largest negative Z address", async () => {
  const filepath = getTestNcFile("example2.NC");
  const ncfile = await NcFile.createFromPath(filepath);

  expect(await ncfile.getDeepestZ()).toBe(-0.8686);
});
