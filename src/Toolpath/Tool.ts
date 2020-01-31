import { ToolInfo } from "../types";
import { Block } from "./Block";
import { Toolpath } from "./Toolpath";

export interface ToolDefinition {
  number: number;
  desc?: string;
}

export class Tool {
  static fromBlock(block: Block): Tool | undefined {
    if (block.hasToolCall) {
      return new Tool({
        number: block.values.T,
        desc: block.comment
      });
    }
  }

  public desc: string;
  public number: number;

  constructor(config?: ToolDefinition) {
    this.number = config?.number ?? 0;
    this.desc = config?.desc ?? "";
  }

  getToolpath(): Toolpath {
    const toolpath = new Toolpath();

    return toolpath.setTool(this);
  }

  getToolInfo(): ToolInfo {
    return [this.number, this];
  }

  toString(): string {
    return `T${this.number} | ${this.desc}`;
  }
}
