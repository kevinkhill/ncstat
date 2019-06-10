import { ITool } from "../typings";
export default class Toolpath {
    tool: ITool;
    lines: string[];
    cannedCycles: string[];
    constructor(line: string);
    hasFeedrates(): boolean;
    getFeedrates(): any[];
    getCannedCycleCount(): number;
}
