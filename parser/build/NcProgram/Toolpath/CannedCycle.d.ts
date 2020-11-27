import { NcBlock } from "../../NcParser/NcBlock";
import { CodeDefinition } from "../../types";
import { Point } from "./Point";
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
    definition: CodeDefinition;
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
    points: Point[];
    constructor(config: CannedCycleConfig);
    get peck(): number | undefined;
    get length(): number;
    get depth(): number | undefined;
    get retract(): number | undefined;
    get feedrate(): number | undefined;
    addPoint(obj: Point): void;
}
export {};
//# sourceMappingURL=CannedCycle.d.ts.map