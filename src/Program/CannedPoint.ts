import { Block } from "./Block";
import { Point } from "./Point";

export class CannedPoint extends Point {
  public static getfactory(cannedCycle) {
    function pointFactory() {
      //
    }

    return pointFactory;
  }
  public R: number;

  constructor(block: Block, cannedCycle) {
    super();
  }

  public setRetract(r: number): void {
    this.R = r;
  }
}
