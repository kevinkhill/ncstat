import { NcBlock } from "@/NcParser";

import { NcRegion } from "./NcRegion";

/**
 * Create a {@link NcRegion} factory
 *
 * This method takes a starting line as it's input
 * to produce a function that will create a {@link NcRegion}
 * starting from the bound line, consuming lines
 * untill a blank line
 */
export const regionFactory = (start: number) => (
  blocks: NcBlock[]
): NcRegion => {
  // eslint-disable-next-line prettier/prettier
  return NcRegion
    .fromBlocks(blocks)
    .startAt(start)
    .endAt(block => block.isEmpty)
    .collect();
};
