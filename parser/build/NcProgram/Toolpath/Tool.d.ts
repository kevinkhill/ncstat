export interface ToolDefinition {
    number: number;
    desc: string;
}
export declare class Tool {
    number: number;
    desc: string;
    static create({ number, desc }: ToolDefinition): Tool;
    constructor(number?: number, desc?: string);
    getToolInfo(): [number, Tool];
    toString(): string;
}
//# sourceMappingURL=Tool.d.ts.map