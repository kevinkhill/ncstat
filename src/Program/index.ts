import fs = require("fs");
import StateMachine from "javascript-state-machine";
import _ from "lodash";
import readline = require("readline");
import { Modals } from "../NcCodes";
import { IPosition } from "../types";
import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { Toolpath } from "./Toolpath";

export default class Program {
  public number: number;
  public title: string;
  public toolpaths: Toolpath[] = [];
  public activeModals: string[];

  private prgExec: StateMachine;
  private position: {
    curr: IPosition;
    prev: IPosition;
  };
  private rapfeed: any;
  private filepath: string;
  private blocks: any[] = [];
  private rawLines: string[] = [];
  private absinc: any = Modals.ABSOLUTE;

  constructor(filepath: string) {
    this.filepath = filepath;
    this.position = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };
    this.prgExec = new StateMachine({
      init: "idle",
      transitions: [
        { name: "start-toolpath", from: "idle", to: "toolpathing" },
        { name: "end-toolpath", from: "toolpathing", to: "idle" },
        {
          name: "start-canned-cycle",
          from: "toolpathing",
          to: "in-canned-cycle"
        },
        { name: "end-canned-cycle", from: "in-canned-cycle", to: "toolpathing" }
      ]
    });
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
    const position = block.getPosition();

    this.position.prev = this.position.curr;

    ["B", "X", "Y", "Z"].forEach(axis => {
      if (position[axis]) {
        if (this.absinc === Modals.INCREMENTAL) {
          this.position.curr[axis] += position[axis];
        }

        if (this.absinc === Modals.ABSOLUTE) {
          this.position.curr[axis] = position[axis];
        }
      }
    });
  }

  public getFileStream(): readline.Interface {
    return readline.createInterface({
      crlfDelay: Infinity,
      input: fs.createReadStream(this.filepath)
    });
  }

  public async analyze() {
    let toolpath = null;

    for await (const line of this.getFileStream()) {
      if (line !== "") {
        const block = new Block(line);

        this.blocks.push(block);
        this.rawLines.push(line);

        this.setModals(block);

        if (block.hasAddress("O")) {
          this.number = block.getAddress("O");
          this.title = block.getComment();
        }

        if (block.hasMovement()) {
          this.updatePosition(block);
        }

        if (block.isStartOfCannedCycle() && this.prgExec.is("toolpathing")) {
          this.prgExec.startCannedCycle();

          const cannedCycle = new CannedCycle(block);

          toolpath.addCannedCycle(cannedCycle);
        }

        if (this.prgExec.is("in-canned-cycle")) {
          if (block.G(80)) {
            this.prgExec.endCannedCycle();
          }

          if (block.hasMovement()) {
            const point = _.clone(this.position.curr);
            const lastCC = _.last(toolpath.cannedCycles) as CannedCycle;

            lastCC.addPoint(point);
          }
        }

        // Tracking toolpaths (tools) via Nxxx lines with a comment
        // This has been defined in the custom H&B posts
        if (line.startsWith("N")) {
          if (this.prgExec.is("toolpathing")) {
            this.prgExec.endToolpath();
            this.toolpaths.push(toolpath);
          }

          if (this.prgExec.is("idle")) {
            toolpath = new Toolpath(block);

            this.prgExec.startToolpath();
          }
        }

        // If we're toolpathing and `line` is not empty, save it to the toolpath
        if (
          (this.prgExec.is("toolpathing") ||
            this.prgExec.is("in-canned-cycle")) &&
          line !== "" &&
          line !== " "
        ) {
          toolpath.lines.push(line);
        }
      }
    }

    this.prgExec.endToolpath();
    this.toolpaths.push(toolpath);
  }

  private setModals(block: Block): void {
    this.activeModals = [];

    if (block.G(0)) {
      this.rapfeed = Modals.RAPID;
      this.activeModals.push(Modals.RAPID);
    } else if (block.G(1)) {
      this.rapfeed = Modals.FEED;
      this.activeModals.push(Modals.FEED);
    }

    if (block.G(90)) {
      this.absinc = Modals.ABSOLUTE;
      this.activeModals.push(Modals.ABSOLUTE);
    } else if (block.G(91)) {
      this.absinc = Modals.INCREMENTAL;
      this.activeModals.push(Modals.INCREMENTAL);
    }
  }
}
