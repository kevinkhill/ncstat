import { ITool } from "../types";

export class Toolpath {
  public tool: ITool;
  public lines: string[];
  public cannedCycles: string[];

  private feedrateRegex: RegExp = /F([0-9]+(?:\\.[0-9]*)?)/g;

  constructor(line: string) {
    this.lines = [];
    this.cannedCycles = [];

    this.tool = {
      desc: "",
      num: parseInt(line.match(/^N([0-9]+)/)[1])
    };

    this.tool.desc = this.uncomment(line.replace(`N${this.tool.num}`, ""));
  }

  public hasFeedrates(): boolean {
    return this.lines.some(line => this.feedrateRegex.test(line));
  }

  public getFeedrates() {
    const feedrates = [];

    this.lines.forEach(line => {
      if (this.feedrateRegex.test(line)) {
        const feedrate = line.match(this.feedrateRegex);

        feedrates.push(parseFloat(feedrate[1]));
      }
    });

    return feedrates;
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
