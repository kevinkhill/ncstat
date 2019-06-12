import fs = require("fs");
import _ = require("lodash");
import readline = require("readline");

import { Modals } from "../NcCodes";
import { IPosition } from "../types";
import { Block } from "./Block";
import { CannedCycle } from "./CannedCycle";
import { Toolpath } from "./Toolpath";

export abstract class BaseProgram {
  public number: number;
  public title: string;
  public toolpaths: any[] = [];

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
    this._fsm();
    this.filepath = filepath;
    this.position = {
      curr: { X: 0, Y: 0, Z: 0, B: 0 },
      prev: { X: 0, Y: 0, Z: 0, B: 0 }
    };
  }

  public abstract _fsm();
  public abstract is(state: string): boolean;
  public abstract startToolpath(): void;
  public abstract endToolpath(): void;
  public abstract endCannedCycle(): void;
  public abstract startCannedCycle(): void;

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

  public async analyze() {
    const fileStream = readline.createInterface({
      crlfDelay: Infinity,
      input: fs.createReadStream(this.filepath)
    });

    let toolpath = null;

    for await (const line of fileStream) {
      if (line !== "") {
        const block = new Block(line);

        this.blocks.push(block);
        this.rawLines.push(line);

        this.setModals(block);

        if (block.hasAddress("O")) {
          this.number = block.getAddress("O");
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
          const lastCC = _.last(toolpath.cannedCycles) as CannedCycle;

          lastCC.addPoint(point);
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

  private setModals(block: Block) {
    if (block.G00) {
      this.rapfeed = Modals.RAPID;
    }
    if (block.G01) {
      this.rapfeed = Modals.FEED;
    }

    if (block.G90) {
      this.absinc = Modals.ABSOLUTE;
    }
    if (block.G91) {
      this.absinc = Modals.INCREMENTAL;
    }
  }
}
