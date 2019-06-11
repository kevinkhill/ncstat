import { IPosition } from "../typings";
export declare class Block {
    G04?: boolean;
    G10?: boolean;
    G65?: boolean;
    G80?: boolean;
    G98?: boolean;
    G99?: boolean;
    B?: number;
    O?: number;
    X?: number;
    Y?: number;
    Z?: number;
    rawLine: string;
    comment: string;
    blockSkip: string;
    addresses: string[];
    constructor(line: any);
    getPosition(): IPosition;
    isStartOfCannedCycle(): boolean;
    hasMovement(): boolean;
    hasAddress(ltr: string): boolean;
    getAddress(ltr: string): number;
    getCannedCycleStartCode(): any;
    _mapAddressValuesToObj(): void;
}
