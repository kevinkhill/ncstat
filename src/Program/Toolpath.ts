import _ from "lodash";
import Block from "./Block";
import CannedCycle from "./CannedCycle";
import Tool from "./Tool";

const feedrateRegex: RegExp = /F([0-9]+(?:\\.[0-9]*)?)/g;

export default class Toolpath {
  public tool: Tool;
  public lines: string[] = [];
  public cannedCycles: CannedCycle[] = [];

  constructor(block: Block) {
    this.tool = new Tool(block);
  }

  public hasFeedrates(): boolean {
    return this.lines.some(line => feedrateRegex.test(line));
  }

  public getFeedrates() {
    return _(this.lines)
      .filter(line => feedrateRegex.test(line))
      .map(line => parseFloat(line.match(feedrateRegex)[1]));
  }

  public addCannedCycle(cycle: CannedCycle) {
    this.cannedCycles.push(cycle);
  }

  public getCannedCycleCount(): number {
    return this.cannedCycles.length;
  }
}
