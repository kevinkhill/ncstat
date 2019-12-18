export interface Point {
  [K: string]: number | undefined;
}

export interface Position {
  X: number;
  Y: number;
  Z: number;
  B: number;
}

export interface CannedPoint extends Point {
  I?: number;
  J?: number;
  K?: number;
  R: number;
  Q: number;
}
