import { NcParser } from "../../ncstat-parser/src";
import fs from "fs";
import path from "path";
import { writeOut } from "./writeOut";

(async (args) => {
  const parser = new NcParser({ debug: false });

  parser.on("error", console.error.bind(this));

  const filepath = path.resolve(args[0]);

  const contents = await fs.promises.readFile(filepath, "utf8");

  const program = parser.parse(contents);

  // console.log(program);
  // console.log(parser.getLexer());
})(process.argv.slice(3));
