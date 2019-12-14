export class Point {
  X?: number;
  Y?: number;
  Z?: number;

  constructor(x = 0, y = 0, z = 0) {
    this.X = x;
    this.Y = y;
    this.Z = z;
  }
}
