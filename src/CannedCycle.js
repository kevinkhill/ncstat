const _ = require('lodash')

const nc = require('./NcCodes')
const CannedPoint = require('./CannedPoint')

class CannedCycle {
  constructor (block) {
    this._block = block
    this._points = []

    this.peck = this._block.getAddr('Q')
    this.depth = this._block.getAddr('Z')
    this.retract = this._block.getAddr('R')
    this.feedrate = this._block.getAddr('F')

    this.cycleCommand = nc.G[this.getRetractCode()]
    this.retractCommand = nc.G[this.getRetractCode()]

    this.G98 = this._block.addresses.indexOf('G98') > -1
    this.G99 = this._block.addresses.indexOf('G99') > -1

    _(['Z', 'R', 'Q', 'F']).forEach((addr) => {
      this[addr] = this._block.getAddr(addr, true)
    })
  }

  addPoint (block) {
    this._points.push(new CannedPoint(block))
  }

  getPoints () {
    return this._points
  }

  getPointCount () {
    return this._points.length
  }

  // getRetractCode() {
  //   return _(this._block.addresses).intersection(['G98', 'G99']).flatten()
  // }

  getRetractCode () {
    return _(this._block.addresses).intersection(['G98', 'G99']).flatten()
  }
}

module.exports = CannedCycle
