const AXES = ['B', 'X', 'Y', 'Z']

class Position {
  constructor (block = { B: 0, X: 0, Y: 0, Z: 0 }) {
    this.B = 0
    this.X = 0
    this.Y = 0
    this.Z = 0

    for (const axis in this) {
      if (this.hasOwnProperty(axis)) this[axis] = block[axis]
    }
  }

  G90 (block) {
    const newPosition = new Position(block)

    for (const axis in this) {
      if (this.hasOwnProperty(axis)) newPosition[axis] = this[axis]
    }

    return newPosition
  }

  G91 (block) {
    const newPosition = new Position(block)

    for (const axis in this) {
      if (this.hasOwnProperty(axis)) newPosition[axis] += this[axis]
    }

    return newPosition
  }
}

module.exports = Position
module.exports.AXES = AXES

module.exports.RAPID = 'G00'
module.exports.FEED = 'G01'

module.exports.ABSOLUTE = 'G90'
module.exports.INCREMENTAL = 'G91'
