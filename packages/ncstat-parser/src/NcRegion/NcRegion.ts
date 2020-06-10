import { NcBlock } from "@/NcParser";

export class NcRegion {
  static fromBlocks(blocks: NcBlock[]): NcRegion {
    return new NcRegion(blocks);
  }

  startLine = NaN;
  blocks: NcBlock[] = [];
  endTestFn!: (block: NcBlock) => boolean;

  end!: number;
  start!: number;

  constructor(private $blocks: NcBlock[] = []) {
    this.$blocks = $blocks;
  }

  get length(): number {
    return this.blocks.length;
  }

  push(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }

  startAt(start: number): this {
    if (typeof start !== "number") {
      throw Error("startAt() must be a number");
    }

    this.startLine = start;

    return this;
  }

  endAt(test: (block: NcBlock) => boolean): this {
    if (typeof this.startAt === "undefined") {
      throw Error("from() must be called before endAt()");
    }

    this.endTestFn = test;

    return this;
  }

  collect(): NcRegion {
    if (typeof this.startAt === "undefined") {
      throw Error("start() must be called before collect()");
    }

    if (typeof this.endTestFn === "undefined") {
      // Use the user provided test to break a region
      // Or use the default of a newline.
      this.endTestFn = (block: NcBlock) => block.isEmpty;
    }

    for (const block of this.$blocks.slice(this.startLine)) {
      if (this.endTestFn(block)) break;

      this.blocks.push(block);
    }

    return this;
  }

  toString(): string {
    return this.blocks.map(block => block.toString()).join("\n");
  }

  toArray(): string[] {
    return this.blocks.reduce((blocks, block) => {
      if (block.comment && block.isCommentBlock) {
        blocks.push(block.comment);
      } else {
        blocks.push(block.toString());
      }

      return blocks;
    }, [] as string[]);
  }
}
