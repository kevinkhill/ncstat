import { Linear } from "doublie";

import { NcBlock } from "NcBlock";

export * from "NcParser";

export { getModals } from "./lib/getModals";
export { updatePosition } from "./lib/updatePosition";

export type NcProgram = Linear<NcBlock>;
