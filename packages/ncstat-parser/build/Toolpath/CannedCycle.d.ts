import { NcBlock } from "../NcBlock";
import { Point } from "./Point";
export declare const RETRACT_CODES: string[];
export declare const START_CODES: string[];
interface CannedCycleConfig {
    Z: number;
    R: number;
    F: number;
    Q?: number;
    cycleCommand: string;
    retractCommand: string;
}
export declare class CannedCycle {
    static START_CODES: string[];
    static RETRACT_CODES: string[];
    static fromBlock(block: NcBlock): CannedCycle;
    Z: number;
    R: number;
    F: number;
    cycleCommand: string;
    retractCommand: string;
    Q?: number;
    I?: number;
    J?: number;
    K?: number;
    private points;
    constructor(config: CannedCycleConfig);
    getPeck(): number | undefined;
    getDepth(): number | undefined;
    getRetract(): number | undefined;
    getFeedrate(): number | undefined;
    addPoint(obj: Point): void;
    getPoints(): Point[];
    getPointCount(): number;
}
export {};
//# sourceMappingURL=CannedCycle.d.ts.map