import fs from "fs";
import path from "path";

import { newlineJoin, newlineSplit } from "./lib";
import { Program } from "./Program";
import { ProgramAnalysis } from "./types";

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
    return newlineSplit(this.contents);
  }

  constructor(private contents = "") {
    this.contents = contents;
  }

  toString(): string {
    return newlineJoin(this.lines);
  }

  analyze(): ProgramAnalysis {
    const program = Program.fromFile(this);

    return program.analyze();
  }
}
