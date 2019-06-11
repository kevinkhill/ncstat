import * as chalk from "chalk";
import fs = require("fs");
import StateMachine = require("javascript-state-machine");
import _ = require("lodash");
import readline = require("readline");

import { MODALS } from "../NcCodes";
import { IPosition } from "../typings";
import { CannedCycle } from "./CannedCycle";
import { Toolpath } from "./Toolpath";

import { Block } from "../typings";

const transitions = [
  { name: "start-toolpath", from: "idle", to: "toolpathing" },
  { name: "end-toolpath", from: "toolpathing", to: "idle" },

  { name: "start-canned-cycle", from: "toolpathing", to: "in-canned-cycle" },
  { name: "end-canned-cycle", from: "in-canned-cycle", to: "toolpathing" }
];

class Program {
  public number: number;
  public title: string;
  public toolpaths: any[];

  private absinc: any;
  private blocks: any[];
  private position: {
    curr: IPosition;
    prev: IPosition;
  };
  private fileStream: any;
  private fsm: any;
  private rapfeed: any;
  private rawLines: string[];

  constructor(filepath: string) {
    this.fsm();
    this.rawLines = [];
    this.blocks = [];
    this.fileStream = readline.createInterface({
      crlfDelay: Infinity,
      input: fs.createReadStream(filepath)
    });
    this.position = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };
    this.absinc = MODALS.ABSOLUTE;

    this.toolpaths = [];
  }

  public toString(): string {
    return this.rawLines.join("\n");
  }

  public getToolpathCount(): number {
    return this.toolpaths.length;
  }

  public getPosition(): IPosition {
    return this.position.curr;
  }

  public getPrevPosition(): IPosition {
    return this.position.prev;
  }

  public updatePosition(block: Block): void {
    const axes = ["B", "X", "Y", "Z"];
    const position = block.getPosition();

    this.position.prev = this.position.curr;

    axes.forEach(axis => {
      if (position[axis]) {
        if (this.absinc === MODALS.INCREMENTAL) {
          this.position.curr[axis] += position[axis];
        }

        if (this.absinc === MODALS.ABSOLUTE) {
          this.position.curr[axis] = position[axis];
        }
      }
    });
  }

  public async process() {
    let toolpath = null;

    for await (const line of this.fileStream) {
      if (line !== "") {
        const block = new Block(line);

        this.blocks.push(block);
        this.rawLines.push(line);

        this.setModals(block);

        if (block.O) {
          this.number = block.O;
          this.title = block.comment;
        }

        if (block.hasMovement()) {
          this.updatePosition(block);
        }

        if (block.isStartOfCannedCycle() && this.is("toolpathing")) {
          this.startCannedCycle();

          const cannedCycle = new CannedCycle(block);

          toolpath.cannedCycles.push(cannedCycle);
        }

        if (this.is("in-canned-cycle") && block.G80 === true) {
          this.endCannedCycle();
        }

        if (this.is("in-canned-cycle") && block.hasMovement()) {
          const point = _.clone(this.position.curr);

          _.last(toolpath.cannedCycles).addPoint(point);
        }

        if (line[0] === "N") {
          if (this.is("toolpathing")) {
            this.endToolpath();
            this.toolpaths.push(toolpath);
          }

          if (this.is("idle")) {
            toolpath = new Toolpath(line);

            this.startToolpath();
          }
        }

        // If we're toolpathing and `line` is not empty, save it to the toolpath
        if (
          (this.is("toolpathing") || this.is("in-canned-cycle")) &&
          line !== "" &&
          line !== " "
        ) {
          toolpath.lines.push(line);
        }
      }
    }

    this.endToolpath();
    this.toolpaths.push(toolpath);
  }

  public describe(options) {
    let output = `Program #${this.number} ${this.title}\n`;
    output +=
      "---------------------------------------------------------------------------------------\n";

    this.toolpaths.forEach(toolpath => {
      if (toolpath.hasFeedrates()) {
        // const feedrates = toolpath.getFeedrates()

        output += chalk.magenta(`T${_.padEnd(toolpath.tool.num, 3)}`);
        output += " | ";
        output += chalk.blue(`${toolpath.tool.desc}\n`);

        if (options.cannedCycles && toolpath.cannedCycles.length > 0) {
          toolpath.cannedCycles.forEach(cannedCycle => {
            output += chalk`{greenBright ${cannedCycle.retractCommand}}`;
            output += chalk`, {greenBright ${cannedCycle.cycleCommand}}`;
            output += chalk` with {yellow ${cannedCycle.getPointCount()}} points\n`;

            if (options.cannedPoints) {
              cannedCycle.getPoints().forEach(position => {
                output += `X${position.X}, Y${position.Y}\n`;
              });
            }
          });
        }

        // const minFeedrate = chalk.red.bold(_.min(feedrates).toFixed(3))

        // const average = _.sum(feedrates) / feedrates.length
        // const averageFeedrate = chalk.red.bold(average.toFixed(3))

        // const meanFeedrate = chalk.red.bold(_.mean(feedrates).toFixed(3))

        // const maxFeedrate = chalk.red.bold(_.max(feedrates).toFixed(3))

        // console.log(`${toolNum} | ${toolDesc} | MIN: ${minFeedrate} MAX: ${maxFeedrate} MEAN: ${meanFeedrate}`)
      }
    });

    return output;
  }

  private setModals(block: Block) {
    if (block.G00) {
      this.rapfeed = MODALS.RAPID;
    }
    if (block.G01) {
      this.rapfeed = MODALS.FEED;
    }

    if (block.G90) {
      this.absinc = MODALS.ABSOLUTE;
    }
    if (block.G91) {
      this.absinc = MODALS.INCREMENTAL;
    }
  }
}

export default StateMachine.factory(Program, {
  init: "idle",
  transitions
});
