import { NcBlock } from "@/NcParser";

export class NcRegion {
  static create(blocks: NcBlock[]): NcRegion {
    return new NcRegion(blocks);
  }

  startLine = NaN;
  blocks: NcBlock[] = [];
  endTestFn!: (block: NcBlock) => boolean;

  constructor(private $blocks: NcBlock[]) {
    this.$blocks = $blocks;
  }

  start(start: number): this {
    if (typeof start !== "number") {
      throw Error("start() must be a number");
    }

    this.startLine = start;

    return this;
  }

  endAt(test: (block: NcBlock) => boolean) {
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

  addBlock(block: NcBlock): this {
    this.blocks.push(block);

    return this;
  }
}
