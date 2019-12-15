// import filter from "lodash/filter";
import { filter, map } from "lodash/fp";

import { regexExtract } from "../lib";
import { Maybe } from "../types";
import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { Tool } from "./Tool";

export const FEEDRATE_REGEX = /F([0-9]+(?:\\.[0-9]*)?)/g;

export class Toolpath {
  static fromTool(tool: Tool): Toolpath {
    const toolpath = new Toolpath();

    return toolpath.setTool(tool);
  }

  static fromBlock(block: Block): Toolpath {
    if (!block.hasToolCall) {
      throw new Error("Txx missing from block");
    }

    return Toolpath.fromBlock(block);
  }

  tool?: Tool;
  lines: string[] = [];
  cannedCycles: CannedCycle[] = [];

  get hasTool(): boolean {
    return this.tool instanceof Tool;
  }

  setTool(tool: Tool): this {
    this.tool = tool;
    return this;
  }

  getToolRecord(): Maybe<[number, Tool]> {
    if (this.hasTool) {
      return [this.tool!.number, this.tool!];
    }
  }

  addLine(line: string): void {
    this.lines.push(line);
  }

  get hasFeedrates(): boolean {
    return this.lines.some(line => FEEDRATE_REGEX.test(line));
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getFeedrates(): number[] {
    return map(
      (line: string) => parseFloat(regexExtract(FEEDRATE_REGEX, line)),
      filter(FEEDRATE_REGEX.test, this.lines)
    );
  }

  addCannedCycle(cycle: CannedCycle): this {
    this.cannedCycles.push(cycle);
    return this;
  }

  getCannedCycleCount(): number {
    return this.cannedCycles.length;
  }
}
