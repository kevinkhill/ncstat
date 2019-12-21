import fs from "fs";
import { each, filter, join, min, split, uniq } from "lodash/fp";
import path from "path";
import { Program } from './Program';

export class NcFile {
  static fromString(nc: string) {
    throw new Error("Method not implemented.");
  }
  static async createFromBuffer(buffer: Buffer): Promise<NcFile> {
    return new NcFile(buffer.toString());
  }

  static async createFromPath(abspath: string): Promise<NcFile> {
    if (!path.isAbsolute(abspath)) {
      throw Error("The path must be absolute.");
    }

    const buffer = await fs.promises.readFile(abspath);

    return NcFile.createFromBuffer(buffer);
  }

  constructor(private contents = "") {
    this.contents = contents;
  }

  analyze(): Program {
    const program = Program.analyzeNcFile(this);

    return program.analyze();
  }

  toString(): string {
    return join("\n", this.getLines);
  }

  getLines(): string[] {
    return split("\n", this.contents);
  }
}
