import path from "path";

export function getTestNcFile(filename: string): string {
  return path.join(__dirname, "ncfiles", filename);
}
