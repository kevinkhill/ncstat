import fs from "fs";
import path from "path";

import { NcParser } from "@/NcParser";
import { NcParserConfig, NcProgram } from "@/types";

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

  parser.on("token", token => console.log(token));

  const program: NcProgram = parser.parse(await readFile("./A.NC"));

  console.log(program.toString());
})();
