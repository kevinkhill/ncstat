import { NcCodeDef } from "./codes";
export declare const G_CODE_GROUPS: {
    MOTION: Record<string, string>;
    COMPENSATION: Record<string, string>;
    COORDINATE: Record<string, string>;
    OTHER: Record<string, string>;
    CANNED: Record<string, string>;
};
export declare const G_CODES: {
    [K: string]: NcCodeDef;
};
/**
 * @TODO FIX THIS!!!!!!!!!
 */
export declare function gCode(query: string): string;
//# sourceMappingURL=gcodes.d.ts.map