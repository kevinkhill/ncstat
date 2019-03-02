const AXES = ['B', 'X', 'Y', 'Z']

class Position {
  constructor (block) {
    this.B = 0
    this.X = 0
    this.Y = 0
    this.Z = 0

    AXES.forEach(axis => {
      if (block[axis]) this[axis] = block[axis]
    })
  }
}

module.exports = Position
module.exports.AXES = AXES

module.exports.RAPID = 'G00'
module.exports.FEED = 'G01'

module.exports.ABSOLUTE = 'G90'
module.exports.INCREMENTAL = 'G91'
