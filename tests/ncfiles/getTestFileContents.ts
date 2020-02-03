import fs from "fs";
import path from "path";

export function getTestFileContents(filename: string): string {
  const abspath = path.join(__dirname, filename);

  // eslint-disable-next-line no-sync
  return fs.readFileSync(abspath).toString();
}
