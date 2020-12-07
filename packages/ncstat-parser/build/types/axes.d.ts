export declare type VmcAxis = "X" | "Y" | "Z";
export declare type HmcAxis = VmcAxis | "B";
export interface AxisLimits {
    min: number;
    max: number;
}
export declare type AxesLimits = Record<HmcAxis, AxisLimits>;
export interface NcPosition {
    [K: string]: number;
    X: number;
    Y: number;
    Z: number;
    B: number;
}
//# sourceMappingURL=axes.d.ts.map