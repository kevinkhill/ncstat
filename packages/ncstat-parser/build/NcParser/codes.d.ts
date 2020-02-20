export { Address } from "./Address";
export interface NcCodeDef {
    COMMAND: string;
    GROUP: string;
}
export declare type PositioningMode = "G90" | "G91";
export declare type PlaneSelection = "G17" | "G18" | "G19";
export declare type MOTION_CODES = "GROUP_01";
export declare type PLANE_SELECTION = "GROUP_02";
export declare type POSITIONING_MODE = "GROUP_03";
export declare enum Modals {
    RAPID = "G00",
    FEED = "G01",
    ABSOLUTE = "G90",
    INCREMENTAL = "G91",
    NON_MODAL = "GROUP_00",
    MOTION_CODES = "GROUP_01",
    PLANE_SELECTION = "GROUP_02",
    POSITIONING_MODE = "GROUP_03"
}
export declare const G_CODES: {
    [K: string]: NcCodeDef;
};
export declare const M_CODES: {
    [K: string]: NcCodeDef;
};
export declare const COMMANDS: {
    G: (n: number) => NcCodeDef;
    M: (n: number) => NcCodeDef;
};
//# sourceMappingURL=codes.d.ts.map