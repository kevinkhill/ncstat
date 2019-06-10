import Block from "./Block";
export declare const MODALS: {
    RAPID: string;
    FEED: string;
    ABSOLUTE: string;
    INCREMENTAL: string;
};
declare class Position {
    B: number;
    X: number;
    Y: number;
    Z: number;
    constructor(block?: Block);
}
export default Position;
