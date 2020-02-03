import { ToolInfo } from "../types";
import { Block } from "./Block";
import { Toolpath } from "./Toolpath";

export interface ToolDefinition {
  number: number;
  desc: string;
}

export class Tool {
  static create({ number, desc }: ToolDefinition): Tool {
    return new Tool(number, desc);
  }

  constructor(public number = 0, public desc = "") {
    this.number = number;
    this.desc = desc;
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
