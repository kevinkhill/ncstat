import fs from "fs";
import map from "lodash/fp/map";
import path from "path";

import { NcParser } from "@/NcParser";
import { NcProgram } from "@/NcProgram";
import { NcParserConfig } from "@/types";

/**
 * Uncomment one of these to give the parser a demo
 */
const DEMO_FILE = "SIMPLE.NC"; // Tiny
// const DEMO_FILE = "TRM.NC"; // Small
// const DEMO_FILE = "405.NC"; // Medium
// const DEMO_FILE = "VF10.NC"; // Big

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const readFile = (file: string): Promise<string> =>
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
  const contents = await readFile(DEMO_FILE);
  const program: NcProgram = parser.parse(contents);

  // console.log(program.toString());
  console.log(program.getStats());
  // console.log(
  //   program.tokens.map(token => ({
  //     text: token.text,
  //     definition: token.definition
  //   }))
  // );
  program.toolpaths.forEach(toolpath => {
    console.log(toolpath);
  });

  // program.withBlocks((block: NcBlock) => console.log(block));
})();
