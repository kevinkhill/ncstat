import { Block } from "./Block";
import { Point } from "./Point";
export declare const CANNED_CYCLE_ARGS: string[];
export declare class CannedCycle {
    peck: any;
    depth: any;
    retract: any;
    feedrate: any;
    cycleCommand: any;
    retractCommand: any;
    G98?: any;
    G99?: any;
    private points;
    private block;
    constructor(block: Block);
    addPoint(point: Point): void;
    getPoints(): any[];
    getPointCount(): number;
}
