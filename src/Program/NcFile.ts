import fs from "fs";
import path from "path";

import { Program } from "./Program";

export function analyzeNcFile(file: NcFile): Program {
  return Program.fromFile(file).analyze();
}

export class NcFile {
  static create(code: string): NcFile {
    throw new NcFile(code);
  }

  static fromBuffer(buffer: Buffer): NcFile {
    return new NcFile(buffer.toString());
  }

  static async fromPath(abspath: string): Promise<NcFile> {
    if (!path.isAbsolute(abspath)) {
      throw Error("The path must be absolute.");
    }

    const buffer = await fs.promises.readFile(abspath);

    return NcFile.fromBuffer(buffer);
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
