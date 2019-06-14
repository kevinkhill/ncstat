export declare class StateMachine {
  public is(state: string): boolean;
  public startToolpath(): void;
  public endToolpath(): void;
  public endCannedCycle(): void;
  public startCannedCycle(): void;
}
