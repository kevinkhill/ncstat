import fs from "fs";
import path from "path";

import { NcBlock } from "@/NcBlock";
import { NcParser } from "@/NcParser";
import { NcProgram } from "@/NcProgram";
import { NcParserConfig } from "@/types";

const DEMO_FILE = "./small.NC";
// const DEMO_FILE = "./A.NC";

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
