import fs from "fs";

export async function readFile(filepath: string): Promise<string> {
  return fs.promises.readFile(filepath, "utf-8");
}
