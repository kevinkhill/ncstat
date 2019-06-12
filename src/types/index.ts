export interface IAddress {
  ltr: string;
  val: number;
}

export interface ITool {
  desc: string;
  num: number;
}

export interface IPoint {
  X: number;
  Y: number;
  Z: number;
}

export interface IPosition extends IPoint {
  B: number;
}
