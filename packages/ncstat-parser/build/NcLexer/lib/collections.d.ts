import { TokenTypes } from "../../types";
import { NcToken } from "../NcToken";
export declare const getType: import("lodash/fp").LodashProp11x1;
export declare const getPrefix: import("lodash/fp").LodashProp11x1;
export declare const prefixWith: (prefix: string) => (code: number) => string;
export declare function filterByPrefix(prefix: string, tokens: NcToken[]): NcToken[];
export declare function findByPrefix(prefix: string, tokens: NcToken[]): NcToken | undefined;
export declare function findByType(type: TokenTypes, tokens: NcToken[]): NcToken | undefined;
export declare const getGcodes: (tokens: NcToken[]) => NcToken[];
export declare const getMcodes: (tokens: NcToken[]) => NcToken[];
//# sourceMappingURL=collections.d.ts.map