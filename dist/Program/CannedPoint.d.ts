import Point from './Point';
import Block from './Block';
export default class CannedPoint extends Point {
    R: number;
    static getfactory(cannedCycle: any): () => void;
    constructor(block: Block, cannedCycle: any);
    setRetract(r: number): void;
}
