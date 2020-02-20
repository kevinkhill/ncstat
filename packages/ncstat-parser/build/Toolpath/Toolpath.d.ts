import { NcBlock } from "../NcBlock";
import { CannedCycle } from "./CannedCycle";
import { Tool } from "./Tool";
export declare class Toolpath {
    readonly blocks: NcBlock[];
    static fromTool(tool: Tool): Toolpath;
    tool?: Tool;
    hasCoolant: boolean;
    description?: string;
    cannedCycles: CannedCycle[];
    constructor(blocks?: NcBlock[]);
    get hasTool(): boolean;
    setTool(tool: Tool): this;
    addBlock(block: NcBlock): this;
    addCannedCycle(cycle: CannedCycle): this;
    getCannedCycleCount(): number;
}
//# sourceMappingURL=Toolpath.d.ts.map