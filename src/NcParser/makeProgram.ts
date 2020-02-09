import { Linear } from "doublie";

import { NcBlock } from "./NcBlock";

export type NcProgram = Linear<NcBlock>;

export function makeProgram(blocks: NcBlock[]): NcProgram {
  const program = new Linear<NcBlock>();

  blocks.forEach(block => program.append(block));

  return program;
}
