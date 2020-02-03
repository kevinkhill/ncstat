import { Program } from "./Program";

export function analyzeCode(code: string): Program {
  return Program.create(code).analyze();
}
