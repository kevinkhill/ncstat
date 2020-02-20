import { Linear } from "doublie";
import { NcBlock } from "../NcBlock";
export declare type NcBlocks = NcBlock[] | Generator<NcBlock>;
export declare type NcProgram = Linear<NcBlock>;
export interface ActiveModals {
    GROUP_01: "G00" | "G01";
    GROUP_02: "G17" | "G18" | "G19";
    GROUP_03: "G90" | "G91";
}
export declare type VmcAxis = "X" | "Y" | "Z";
export declare type HmcAxis = VmcAxis | "B";
export interface AxisLimits {
    axis: HmcAxis;
    min: number;
    max: number;
}
export declare type AxesLimits = Record<HmcAxis, AxisLimits>;
export interface Position {
    [K: string]: number;
    X: number;
    Y: number;
    Z: number;
    B: number;
}
export interface MachinePositions {
    curr: Position;
    prev: Position;
}
//# sourceMappingURL=index.d.ts.map