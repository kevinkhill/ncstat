import { ModalGroupStrings } from "../types";
export declare function isNumber(x: unknown): x is number;
export declare function isString(x: unknown): x is string;
export declare function isValidModalGroup(value: string): value is ModalGroupStrings;
export declare function assertValidModalGroup(value: string): asserts value is ModalGroupStrings;
export declare function assertisValidModalGroups(groups: string[]): groups is string[];
export declare function isValidModalGroups(groups: string[]): groups is string[];
//# sourceMappingURL=guards.d.ts.map