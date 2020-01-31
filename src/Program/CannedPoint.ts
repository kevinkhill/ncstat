import Block from "./Block";
import Point from "./Point";

export default class CannedPoint extends Point {
  public R?: number;
  public Z?: number;

  constructor(block: Block) {
    super();

    this.Z = block.values.Z;
    this.R = block.values.R;
  }
}
