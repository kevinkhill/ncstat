import { ITool } from "../types";
export declare class Toolpath {
    tool: ITool;
    lines: string[];
    cannedCycles: string[];
    private feedrateRegex;
    constructor(line: string);
    hasFeedrates(): boolean;
    getFeedrates(): any[];
    getCannedCycleCount(): number;
    private uncomment;
}
