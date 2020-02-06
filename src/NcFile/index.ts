import { Program } from "../Program";
import { NcFile } from "./NcFile";

export { NcFile };

export function analyzeNcFile(file: NcFile): Program {
  return Program.fromFile(file).analyze();
}
