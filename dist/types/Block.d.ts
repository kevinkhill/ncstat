declare class Block {
    rawLine: string;
    comment: string;
    blockSkip: string;
    addresses: string[];
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
    constructor(line: any);
    getPosition(): Position;
    isStartOfCannedCycle(): boolean;
    hasMovement(): boolean;
    hasAddress(ltr: string): boolean;
    getAddress(ltr: string, cast?: boolean): any;
    getCannedCycleStartCode(): any;
    _mapAddressValuesToObj(): any;
}
export default Block;
