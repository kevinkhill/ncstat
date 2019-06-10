import { ITool } from "../typings";

const nLineRegex: RegExp = /^N([0-9]+)/;
const feedrateRegex: RegExp = /F([0-9]+(?:\\.[0-9]*)?)/g;

function uncomment(str: string): string {
  return str.replace("(", "").replace(")", "").trim();
}

export default class Toolpath {
  public tool: ITool;
  public lines: string[];
  public cannedCycles: string[];

  constructor(line: string) {
    this.lines = [];
    this.cannedCycles = [];

    this.tool = {
      desc: "",
      num: parseInt(line.match(nLineRegex)[1]),
    };

    this.tool.desc = uncomment(line.replace(`N${this.tool.num}`, ""));
  }

  public hasFeedrates(): boolean {
    return this.lines.some((line) => feedrateRegex.test(line));
  }

  public getFeedrates() {
    const feedrates = [];

    this.lines.forEach((line) => {
      if (feedrateRegex.test(line)) {
        const feedrate = line.match(feedrateRegex);

        feedrates.push(parseFloat(feedrate[1]));
      }
    });

    return feedrates;
  }

  public getCannedCycleCount(): number {
    return this.cannedCycles.length;
  }
}
