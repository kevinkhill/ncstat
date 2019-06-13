import { ICannedCycle } from "../types";
import { Block } from "./Block";
import { Point } from "./Point";
export declare class CannedCycle extends Block implements ICannedCycle {
    Z: number;
    R: number;
    F: number;
    Q: number;
    cycleCommand: string;
    retractCommand: string;
    private points;
    constructor(line: string);
    readonly peck: number;
    readonly depth: number;
    readonly retract: number;
    readonly feedrate: number;
    getRetractCode(): string;
    getCannedCycleStartCode(): string;
    addPoint(point: Point): CannedCycle;
    getPoints(): Point[];
    getPointCount(): number;
}
