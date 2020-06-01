/* eslint-disable no-sync */
import fs from "fs";
import path from "path";
import findUp from "find-up";

import { NcParser } from "../../NcParser";

const parser = new NcParser();

const abspath = path.join(findUp.sync("ncfiles"), "example1.NC");
const contents = fs.readFileSync(abspath).toString();


it(`has 27 lines`, async () => {
  const program = await parser.parse(contents);

  expect(program.length).toBe(27);
});
