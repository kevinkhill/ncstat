import { forEach, map } from "lodash/fp";

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

    return toolpath.analyze();
  }

  tool = new Tool();
  hasCoolant = false;
  blocks: Block[] = [];
  description?: string;
  cannedCycles: CannedCycle[] = [];

  get hasTool(): boolean {
    return this.tool.number !== 0;
  }

  analyze(): this {
    for (const block of this.blocks) {
      // @TODO gross!!
      if (block.hasCommand(8) || block.hasCommand(50)) {
        this.hasCoolant = true;
      }

      if (block.isNline) {
        this.tool = new Tool({
          number: block.values.N,
          desc: block.comment
        });
      }

      if (block.comment) {
        this.description = block.comment;
      }
    }

    return this;
  }

  setTool(tool: Tool): this {
    this.tool = tool;

    return this;
  }

  setToolFromBlock(block: Block): this {
    this.tool = block.getTool() as Tool;

    return this;
  }

  parseLine(line: string): this {
    const block = Block.parse(line);

    this.blocks.push(block);

    return this;
  }

  pushBlock(block: Block): this {
    this.blocks.push(block);

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
