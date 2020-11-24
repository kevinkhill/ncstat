import { AxesLimits } from "./axes";
interface UnitCount {
    count: number;
}
export interface ProgramStats {
    tokens: UnitCount;
    blocks: UnitCount;
    toolpaths: UnitCount;
    toolchanges: UnitCount;
    limits: AxesLimits;
}
export {};
//# sourceMappingURL=stats.d.ts.map