import fs from "fs";
import path from "path";

import { NcParser } from "../src";

const abspath = path.join(__dirname, "..", "ncfiles", "example1.NC");
// eslint-disable-next-line no-sync
const contents = fs.readFileSync(abspath).toString();
// const program = new NcParser(contents);

// it(`is a program`, async () => {
//   expect(program).toBeInstanceOf(Program);
// });

// it(`has 27 lines`, async () => {
//   expect(program.lineCount).toBe(27);
// });
