const Point = require('./Point')

class CannedPoint extends Point {
  constructor(block) {
    super(
      block.getAddr('X'),
      block.getAddr('Y'),
      block.getAddr('Z'),
    )

    this.R = block.getAddr('R')
  }

  setRetract(r) {
    this.R = r
  }
}

module.exports = CannedPoint
