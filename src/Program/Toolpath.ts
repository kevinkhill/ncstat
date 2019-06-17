import _ from "lodash";
import { ITool } from "../types";
import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";

export class Toolpath {
  public tool: ITool;
  public lines: string[] = [];
  public cannedCycles: CannedCycle[] = [];

  private feedrateRegex: RegExp = /F([0-9]+(?:\\.[0-9]*)?)/g;

  constructor(block: Block) {
    this.tool = {
      desc: block.getComment(),
      num: block.values.N
    };
  }

  public hasFeedrates(): boolean {
    return this.lines.some(line => this.feedrateRegex.test(line));
  }

  public getFeedrates() {
    return _.map(this.lines, line => {
      if (this.feedrateRegex.test(line)) {
        const feedrate = line.match(this.feedrateRegex);

        return parseFloat(feedrate[1]);
      }
    });
  }

  public addCannedCycle(cycle: CannedCycle) {
    this.cannedCycles.push(cycle);
  }

  public getCannedCycleCount(): number {
    return this.cannedCycles.length;
  }

  private uncomment(str: string): string {
    return str
      .replace("(", "")
      .replace(")", "")
      .trim();
  }
}
