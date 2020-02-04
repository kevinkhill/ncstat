import { forEach } from "lodash/fp";

import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { Tool } from "./Tool";

export class Toolpath {
  static fromTool(tool: Tool): Toolpath {
    const toolpath = new Toolpath();

    return toolpath.setTool(tool);
  }

  static parse(multiline: string): Toolpath {
    const toolpath = new Toolpath();

    forEach(
      line => toolpath.parseLine(line),
      multiline.split(/\r?\n/g)
    );

    return toolpath;
  }

  tool?: Tool;
  hasCoolant = false;
  blocks: Block[] = [];
  description?: string;
  cannedCycles: CannedCycle[] = [];

  get hasTool(): boolean {
    return this.tool !== undefined;
  }

  setTool(tool: Tool): this {
    this.tool = tool;

    return this;
  }

  pushBlock(block: Block): this {
    this.blocks.push(block);

    return this;
  }

  parseLine(line: string): this {
    this.pushBlock(Block.parse(line));

    return this;
  }

  // get hasFeedrates(): boolean {
  //   return this.lines.some(line => FEEDRATE_REGEX.test(line));
  // }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // getFeedrates(): number[] {
  //   return map(
  //     (line: string) => parseFloat(regexExtract(FEEDRATE_REGEX, line)),
  //     filter(FEEDRATE_REGEX.test, this.lines)
  //   );
  // }

  addCannedCycle(cycle: CannedCycle): this {
    this.cannedCycles.push(cycle);
    return this;
  }

  getCannedCycleCount(): number {
    return this.cannedCycles.length;
  }
}
