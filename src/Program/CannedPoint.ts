import Block from "./Block";
import Point from "./Point";

export default class CannedPoint extends Point {

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
