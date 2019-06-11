import { Block } from "./Block";
import { Point } from "./Point";
export declare class CannedPoint extends Point {
    static getfactory(cannedCycle: any): () => void;
    R: number;
    constructor(block: Block, cannedCycle: any);
    setRetract(r: number): void;
}
