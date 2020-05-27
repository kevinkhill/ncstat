import fs from "fs";

import { NcParserConfig } from "@/types";

import { NcParser } from "../src/NcParser";

const config: NcParserConfig = {
  debug: true,
  lexerConfig: {
    tokens: {
      EOF: false
    }
  }
};

const parser = new NcParser(config);

(async () => {
  const contents = await fs.promises.readFile(
    "../../ncfiles/A.NC",
    "utf8"
  );

  const tokens = parser.getLexer().tokens(contents);

  console.log(tokens);
})();
