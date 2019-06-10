/// <reference path="../../typings/Block.d.ts" />
import Position from './Position';
interface Block {
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
}
declare class Block {
    rawLine: string;
    comment: string;
    blockSkip: string;
    addresses: Array<string>;
    constructor(line: any);
    getPosition(): Position;
    isStartOfCannedCycle(): boolean;
    hasMovement(): boolean;
    hasAddress(ltr: string): boolean;
    getAddress(ltr: string, cast?: boolean): string | number;
    getCannedCycleStartCode(): string;
    _mapAddressValuesToObj(): void;
}
export default Block;
