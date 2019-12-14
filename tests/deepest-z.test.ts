/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs";
import { each, filter, min, uniq } from "lodash/fp";
import path from "path";

import { Program } from "../src";

test("Scan the program for the deepest (largest negative) Z address", async () => {
  const filepath = path.join(__dirname, "../nc/example2.NC");
  const buffer = await fs.promises.readFile(filepath);
  const contents = buffer.toString();
  const lines = filter(l => l !== " ", contents.split("\n"));
  const z: any = [];
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
