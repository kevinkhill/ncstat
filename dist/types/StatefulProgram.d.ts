export default abstract class StatefulProgram {
    abstract is(state: string): boolean;
    abstract startToolpath(): void;
    abstract endToolpath(): void;
    abstract endCannedCycle(): void;
    abstract startCannedCycle(): void;
}
