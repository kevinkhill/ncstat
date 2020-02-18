export declare type VmcAxis = "X" | "Y" | "Z";
export declare type HmcAxis = VmcAxis | "B";
export interface AxisLimits {
    axis: HmcAxis;
    min: number;
    max: number;
}
export declare type AxesLimits = Record<HmcAxis, AxisLimits>;
export declare type ExtractorFn = (subject: string) => string | undefined;
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
export interface ActiveModals {
    GROUP_01: "G00" | "G01";
    GROUP_02: "G17" | "G18" | "G19";
    GROUP_03: "G90" | "G91";
}
//# sourceMappingURL=Parser.d.ts.map