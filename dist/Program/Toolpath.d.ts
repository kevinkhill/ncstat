import { ITool } from "../typings";
export declare class Toolpath {
    tool: ITool;
    lines: string[];
    cannedCycles: string[];
    constructor(line: string);
    hasFeedrates(): boolean;
    getFeedrates(): any[];
    getCannedCycleCount(): number;
}
