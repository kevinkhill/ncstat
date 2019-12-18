import { Block } from "./Block";
import { Toolpath } from "./Toolpath";

export class Tool {
  static fromBlock(block: Block | any): Tool | undefined {
    if (block instanceof Block) {
      return new Tool({
        number: block.values.N,
        desc: block.getComment()
      });
    }

    return undefined;
  }

  public desc = "";
  public number = 0;

  constructor(config?: Partial<{ number: number; desc: string }>) {
    Object.assign(this, config);
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
