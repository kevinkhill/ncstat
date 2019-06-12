import { Block } from "./Block";
import { Point } from "./Point";
export declare const CANNED_CYCLE_DEFAULT_ARGS: string[];
export declare const CANNED_CYCLE_START_CODES: string[];
export declare class CannedCycle {
    G98?: any;
    G99?: any;
    peck: any;
    depth: any;
    retract: any;
    feedrate: any;
    cycleCommand: any;
    retractCommand: any;
    private block;
    private points;
    constructor(block: Block);
    addPoint(point: Point): void;
    getPoints(): Point[];
    getPointCount(): number;
}
