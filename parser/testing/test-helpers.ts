import fs from "fs";
import path from "path";

import { NcParser } from "../src/NcParser";
import { NcProgram } from "../src/NcProgram";

export const parser = new NcParser();
export const parseSource = (input: string): NcProgram =>
  parser.parse(input);

export function getDemoFileContents(filename: string): string {
  const filepath = path.join(__dirname, "..", "..", "demo", filename);

  // eslint-disable-next-line no-sync
  return fs.readFileSync(filepath, "utf8");
}
