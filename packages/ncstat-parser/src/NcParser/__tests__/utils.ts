import fs from 'fs';
import path from 'path';
import findUp from "find-up";

export function getNcFileContents(filename) {
  const abspath = path.join(findUp.sync("ncfiles"), filename);
  
  return fs.readFileSync(abspath).toString();
}
