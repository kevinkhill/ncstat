import { NcBlock } from "../../NcParser/NcBlock";
import { CannedCycle } from "./CannedCycle";
import { Tool } from "./Tool";

export class Toolpath {
  static fromTool(tool: Tool): Toolpath {
    const toolpath = new Toolpath();

    return toolpath.setTool(tool);
  }

  tool?: Tool;
  hasCoolant = false;
  description?: string;
  cannedCycles: CannedCycle[] = [];

  constructor(readonly blocks: NcBlock[] = []) {
    this.blocks = blocks;
  }

  get hasTool(): boolean {
    return this.tool !== undefined;
  }

  setTool(tool: Tool): this {
    this.tool = tool;

    return this;
  }

  addBlock(block: NcBlock): this {
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
