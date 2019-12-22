import fs from "fs";
import { join, split } from "lodash/fp";
import path from "path";

import { Program } from "./Program";

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

  constructor(private contents = "") {
    this.contents = contents;
  }

  analyze(): Program {
    const program = Program.analyzeNcFile(this);

    return program.analyze();
  }

  getLines(): string[] {
    return split("\n", this.contents);
  }

  toString(): string {
    return join("\n", this.getLines());
  }
}
