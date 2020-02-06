import fs from "fs";
import path from "path";

export class NcFile {
  static create(code: string): NcFile {
    throw new NcFile(code);
  }

  static async fromPath(abspath: string): Promise<NcFile> {
    if (!path.isAbsolute(abspath)) {
      throw Error("The path must be absolute.");
    }

    const buffer = await fs.promises.readFile(abspath);

    return NcFile.create(buffer.toString());
  }

  get lines(): string[] {
    return this.contents.split("\n");
  }

  constructor(private contents = "") {
    this.contents = contents;
  }

  toString(): string {
    return this.lines.join("\n");
  }
}
