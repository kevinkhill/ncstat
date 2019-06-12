import { IPosition } from "../types";
import { Block } from "./Block";
export declare abstract class BaseProgram {
    number: number;
    title: string;
    toolpaths: any[];
    private position;
    private rapfeed;
    private filepath;
    private blocks;
    private rawLines;
    private absinc;
    constructor(filepath: string);
    abstract _fsm(): any;
    abstract is(state: string): boolean;
    abstract startToolpath(): void;
    abstract endToolpath(): void;
    abstract endCannedCycle(): void;
    abstract startCannedCycle(): void;
    toString(): string;
    getToolpathCount(): number;
    getPosition(): IPosition;
    getPrevPosition(): IPosition;
    updatePosition(block: Block): void;
    analyze(): Promise<void>;
    private setModals;
}
