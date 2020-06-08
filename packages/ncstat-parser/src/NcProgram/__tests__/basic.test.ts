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
    expect(program.tokenCount).toBe(39);
  });

  it(`has 20 blocks / lines`, async () => {
    expect(program.blockCount).toBe(20);
  });

  it(`is program number 1234`, async () => {
    expect(program.number).toBe(1234);
  });

  it(`is named "SIMPLE"`, async () => {
    expect(program.name).toBe("SIMPLE");
  });

  describe(`toolpaths`, ()=>{
    it(`to have 1 toolpath`, async () => {
      expect(program.toolpathCount).toBe(1);
    });

    describe(`tools`, ()=>{
      const toolpath = program.getToolpath(0);

      // it(`to have 1 tool`, async () => {
      //   expect(program.toolList).toHaveLength(1);
      // });

      it(`tool number is 43`, async () => {
        expect(toolpath?.tool?.number).toBe(43);
      });

      it(`tool name is "#14 [.182"] DRILL, CARB, TSC"`, async () => {
        expect(toolpath?.tool?.desc).toBe(`#14 [.182"] DRILL, CARB, TSC`);
      });
    });
  });
});
