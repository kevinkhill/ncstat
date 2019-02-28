const isNumber = require('lodash').isNumber

const AXES = ['B', 'X', 'Y', 'Z']

class Position {
  constructor (block = { B: 0, X: 0, Y: 0, Z: 0 }) {
    this.B = 0
    this.X = 0
    this.Y = 0
    this.Z = 0

    AXES.forEach(ltr => {
      this[ltr] = block[ltr]
    })
  }

  G90 (block) {
    Position.AXES.forEach(ltr => {
      if (isNumber(block[ltr])) {
        this[ltr] = block[ltr]
      }
    })
  }

  G91 (block) {
    Position.AXES.forEach(ltr => {
      if (isNumber(block[ltr])) {
        this[ltr] += block[ltr]
      }
    })
  }
}

module.exports = Position
module.exports.AXES = AXES

module.exports.RAPID = 'G00'
module.exports.FEED = 'G01'

module.exports.ABSOLUTE = 'G90'
module.exports.INCREMENTAL = 'G91'
