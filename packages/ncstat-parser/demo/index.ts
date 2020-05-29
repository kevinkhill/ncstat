import fs from "fs";
import path from "path";

import { NcParser } from "@/NcParser";
import { NcProgram } from "@/NcProgram";
import { NcParserConfig } from "@/types";

// const DEMO_FILE = "./TRM.NC"; // Small
const DEMO_FILE = "./405.NC"; // Medium
// const DEMO_FILE = "./VF10.NC"; // Huge

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const readFile = (file: string) =>
  fs.promises.readFile(path.join(__dirname, file), "utf8");

(async () => {
  const config: NcParserConfig = {
    debug: true,
    lexerConfig: {
      tokens: {
        EOF: false
      }
    }
  };

  const parser = new NcParser(config);

  // parser.getLexer().on("token", token => console.log(token));

  const program: NcProgram = parser.parse(await readFile(DEMO_FILE));

  // console.log(program.toString());
  console.log(program.getStats());
  // program.withBlocks((block: NcBlock) => console.log(block));
})();
