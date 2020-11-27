import { ModalGroupStrings } from "../types";
export declare const MOTION_CODES: string[];
export declare const PLANE_SELECTION: string[];
export declare const ABSOLUTE_INCREMENTAL: string[];
export declare const FEED_RATE_MODE: string[];
export declare const INCH_METRIC: string[];
export declare const CUTTER_RADIUS_COMP: string[];
export declare const TOOL_LENGTH_OFFSET: string[];
export declare const CANNED_CYCLE_RETURN_MODE: string[];
export declare const WORK_COORDINATE_SYSTEM: string[];
/**
 * Arrays of G Codes, grouped by their respective GROUP_nn
 */
export declare const G_CODE: Record<ModalGroupStrings, string[]>;
/**
 * Returns an array of G Codes, as strings, given the name of a group
 */
export declare function gCodeStrings(group: ModalGroupStrings): string[];
/**
 * Returns an array of G Codes, as integers, given the name of a group
 */
export declare function gCodeNumbers(group: ModalGroupStrings): number[];
export declare const G_CODE_MODAL_GROUPS: string[];
//# sourceMappingURL=gcodes.d.ts.map