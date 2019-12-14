import { Block } from "./Block";
import { Toolpath } from "./Toolpath";

export class Tool {
  desc: string;
  number: number;

  constructor(block: Block) {
    this.number = block.values.N;
    this.desc = block.getComment();
  }

  getToolpath(): Toolpath {
    const toolpath = new Toolpath();

    return toolpath.setTool(this);
  }

  toTuple(): [number, Tool] {
    return [this.number, this];
  }

  toString(): string {
    return `T${this.number} | ${this.desc}`;
  }
}
