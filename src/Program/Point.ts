export default class Point {
  X: number
  Y: number
  Z: number

  constructor (x: number = 0, y: number = 0, z: number = 0) {
    this.X = x
    this.Y = y
    this.Z = z
  }
}

module.exports = Point
