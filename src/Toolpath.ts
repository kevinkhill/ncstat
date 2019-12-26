import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { FEEDRATE_REGEX } from "./lib";
import { Tool } from "./Tool";

export class Toolpath {
  static fromTool(tool: Tool): Toolpath {
    const toolpath = new Toolpath();

    return toolpath.setTool(tool);
  }

  static fromBlock(block: Block): Toolpath {
    const toolpath = new Toolpath();

    if (block.hasToolChange) {
      toolpath.setToolFromBlock(block);
    }

    if (block.comment) {
      toolpath.description = block.comment;
    }

    return toolpath;
  }

  tool: Tool = new Tool();
  blocks: Block[] = [];
  description?: string;
  cannedCycles: CannedCycle[] = [];

  get hasTool(): boolean {
    return this.tool.number !== 0;
  }

  setTool(tool: Tool): this {
    this.tool = tool;

    return this;
  }

  setToolFromBlock(block: Block): this {
    this.tool = block.getTool() as Tool;

    return this;
  }

  getToolRecord(): [number, Tool] | undefined {
    if (this.hasTool) {
      return [this.tool.number, this.tool];
    }
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
