import { NcBlock } from "@/NcParser";

export class NcRegion {
  static create(blocks: NcBlock[]): NcRegion {
    return new NcRegion(blocks);
  }

  startLine = NaN;
  blocks: NcBlock[] = [];
  endTestFn!: (block: NcBlock) => boolean;

  constructor(private $blocks: NcBlock[] = []) {
    this.$blocks = $blocks;

    // this.find = this.blocks.find;
    // this.reduce = this.blocks.reduce;
  }

  get length(): number {
    return this.blocks.length;
  }

  push(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }

  start(start: number): this {
    if (typeof start !== "number") {
      throw Error("start() must be a number");
    }

    this.startLine = start;

    return this;
  }

  endAt(test: (block: NcBlock) => boolean): this {
    if (typeof this.start === "undefined") {
      throw Error("from() must be called before endAt()");
    }

    this.endTestFn = test;

    return this;
  }

  collect(): NcRegion {
    if (
      typeof this.start === "undefined" ||
      typeof this.endTestFn === "undefined"
    ) {
      throw Error("from() & endAt() must be called before collect()");
    }
    for (const block of this.$blocks.slice(this.startLine)) {
      this.blocks.push(block);

      if (this.endTestFn(block)) break;
    }

    return this;
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

  toString(): string {
    return this.blocks.map(block => block.toString()).join("\n");
  }
}
