export declare const CANNED_CYCLE_ARGS: string[];
export default class CannedCycle {
    private block;
    _points: any[];
    peck: any;
    depth: any;
    retract: any;
    feedrate: any;
    cycleCommand: any;
    retractCommand: any;
    G98?: any;
    G99?: any;
    constructor(block: any);
    addPoint(point: any): void;
    getPoints(): any[];
    getPointCount(): number;
}
