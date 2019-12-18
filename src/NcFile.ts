import fs from "fs";
import { each, filter, join, min, split, uniq } from "lodash/fp";
import path from "path";

import { Program } from "./Program";

export class NcFile {
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

  toString(): string {
    return join("\n", this.getLines);
  }

  /**
   * @todo look into this more
   */
  analyze(): Program {
    const program = new Program(this.getLines());

    return program.analyze();
  }

  getLines(options = { filterEmptyLines: true }): string[] {
    const lines = split("\n", this.contents);

    return options.filterEmptyLines ? filter(l => l !== " ", lines) : lines;
  }

  analyze(): Program {
    const program = new Program(this.getLines());

    return program.analyze();
  }

  async getDeepestZ(): Promise<number | undefined> {
    const lines = filter(l => l !== " ", this.getLines());
    const z: number[] = [];
    const zRegex = /Z(-[0-9.]+)\s/g;

    each(line => {
      const m = zRegex.exec(line);

      if (m) {
        z.push(parseFloat(m[1]));
      }
    }, lines);

    return min(uniq(z));
  }
}
