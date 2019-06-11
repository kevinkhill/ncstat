declare class Program {
  public is(state: string): boolean;
  public startToolpath(): void;
  public endToolpath(): void;
  public endCannedCycle(): void;
  public startCannedCycle(): void;
}

export default Program;
