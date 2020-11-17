import fs from "fs";
import path from "path";

import { NcParser, NcParserConfig, defineGCode } from "../build";

const DEMO_FILE = "VF10.NC";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const writeFile = (file, data) => {
  const outFile = path.join(__dirname, "output", file);

  console.log(`Writing to ${outFile}`);

  return fs.promises.writeFile(outFile, data);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const readFile = file => fs.promises.readFile(path.join(__dirname, file), "utf8");

(async () => {
  const parser = new NcParser({
    debug: true,
    lexerConfig: {
      tokens: {
        EOF: false
      }
    }
  });

  const contents = await readFile(DEMO_FILE);
  const program = parser.parse(contents);
  const json = JSON.stringify(program);
  // console.log(json);

  program.tokens.forEach(token => {
    if (token.prefix === "G") {
      console.log({
        def: defineGCode(token.text),
        token: token.text
      });
    }
  });

  writeFile("vf10.json", json);
})();
