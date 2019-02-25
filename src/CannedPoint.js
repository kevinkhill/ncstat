const Point = require('./Point')

class CannedPoint extends Point {
  constructor (block) {
    super(
      block.getAddress('X'),
      block.getAddress('Y'),
      block.getAddress('Z')
    )

    this.R = block.getAddress('R')
  }

  setRetract (r) {
    this.R = r
  }
}

module.exports = CannedPoint
