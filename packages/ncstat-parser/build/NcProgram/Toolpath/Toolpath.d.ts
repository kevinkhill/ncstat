import { NcBlock } from "../../NcParser";
import { NcRegion } from "../NcRegion";
import { CannedCycle } from "./CannedCycle";
import { Tool } from "./Tool";
export declare class Toolpath extends NcRegion {
    readonly blocks: NcBlock[];
    static fromTool(tool: Tool): Toolpath;
    rpms?: number;
    description?: string;
    tool: Tool;
    hasCoolant: boolean;
    cannedCycles: CannedCycle[];
    constructor(blocks?: NcBlock[]);
    get hasTool(): boolean;
    setTool(tool: Tool): this;
    setRpms(rpms: number | undefined): void;
    addBlock(block: NcBlock): this;
    addCannedCycle(cycle: CannedCycle): this;
    getCannedCycleCount(): number;
}
//# sourceMappingURL=Toolpath.d.ts.map