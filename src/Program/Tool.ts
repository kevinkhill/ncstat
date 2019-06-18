import Block from "./Block";

export default class Tool {
  public desc: string;
  public num: number;

  public constructor(block: Block) {
    this.num = block.values.N;
    this.desc = block.getComment();
  }

  public toString(): string {
    return `T${this.num} | ${this.desc}`;
  }
}
