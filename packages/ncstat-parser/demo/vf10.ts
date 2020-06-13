import fs from "fs";
import path from "path";

import { NcParser } from "@/NcParser";
import { NcProgram } from "@/NcProgram";
import { NcParserConfig } from "@/types";
import { define, defineGCode } from "@/NcSpec";

const DEMO_FILE = "VF10.NC";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const writeFile = (file: string, data: any): Promise<void> =>
{
  const outFile = path.join(__dirname, "output", file);

  console.log(`Writing to ${outFile}`)

  return fs.promises.writeFile(outFile, data);
}

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
  const contents = await readFile(DEMO_FILE);
  const program: NcProgram = parser.parse(contents);
  // const json = JSON.stringify(program);
  // console.log(json);

  program.tokens.forEach(token => {

    if (token.prefix === "G") {
      const def = defineGCode(token.text);

      console.log({
        def,
        token: token.text,
      });
    }
  });

  // writeFile("vf10.json", json);
})();
