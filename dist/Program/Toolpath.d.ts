export default class Toolpath {
    lines: Array<string>;
    cannedCycles: Array<string>;
    tool: {
        desc: string;
        num: number;
    };
    constructor(line: string);
    hasFeedrates(): boolean;
    getFeedrates(): any[];
    getCannedCycleCount(): number;
}
