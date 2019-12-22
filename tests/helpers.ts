import fs from "fs";
import path from "path";

export async function getTestNcFileContents(
  filename: string
): Promise<string> {
  const abspath = path.join(__dirname, "ncfiles", filename);

  const buffer = await fs.promises.readFile(abspath);

  return buffer.toString();
}
