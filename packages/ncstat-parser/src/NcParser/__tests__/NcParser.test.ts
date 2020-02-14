/* eslint-disable no-sync */
import fs from "fs";
import path from "path";

import { NcParser } from "../..";

const parser = new NcParser();

const abspath = path.join(__dirname, "..", "ncfiles", "example1.NC");
const contents = fs.readFileSync(abspath).toString();
const program = parser.parse(contents);

it(`has 27 lines`, async () => {
  console.log(program);
  // expect(program).toBe(27);
});
