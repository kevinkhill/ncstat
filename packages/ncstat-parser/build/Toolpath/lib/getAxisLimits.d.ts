import { AxisLimits, HmcAxis } from "../../types";
import { Toolpath } from "../Toolpath";
export declare function dedupe<T>(arr: T[]): T[];
export declare function _getAxisLimits(axis: HmcAxis, toolpaths: Toolpath): AxisLimits;
export declare const getAxisLimits: (axis: HmcAxis) => (toolpaths: Toolpath) => AxisLimits;
//# sourceMappingURL=getAxisLimits.d.ts.map