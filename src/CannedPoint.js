const Point = require('./Point')

class CannedPoint extends Point {
  constructor (block) {
    super(block)
  }

  setRetract (r) {
    this.R = r
  }
}

module.exports = CannedPoint
