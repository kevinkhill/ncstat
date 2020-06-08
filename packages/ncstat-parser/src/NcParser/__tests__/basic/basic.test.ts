/* eslint-disable no-sync */
import fs from "fs";
import path from "path";

import { NcParser} from "@/NcParser";
import { NcProgram } from "@/NcProgram";

const parser = new NcParser();

const abspath = path.join(__dirname, "basic.nc");
const contents = fs.readFileSync(abspath).toString();

const program: NcProgram = parser.parse(contents);

describe("basic.nc", () => {
  it(`has 39 tokens`, async () => {
    expect(program.tokens).toHaveLength(39);
  });

  it(`has 20 blocks / lines`, async () => {
    expect(program.blocks).toHaveLength(20);
  });

  it(`is program number "1234"`, async () => {
    expect(program.number).toBe(1234);
  });

  it(`is named "SIMPLE"`, async () => {
    expect(program.name).toBe("SIMPLE");
  });
});