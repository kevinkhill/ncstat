const Point = require('./Point')

class CannedPoint extends Point {
  static getfactory (cannedCycle) {
    function pointFactory () {

    }

    return pointFactory
  }

  constructor (block, cannedCycle) {
    super(block)
  }

  setRetract (r) {
    this.R = r
  }
}

module.exports = CannedPoint