const _ = require('lodash')

const nc = require('./NcCodes')

class CannedCycle {
  constructor(block) {
    this._block = block

    this.peck = this._block.getAddr('Q')
    this.depth = this._block.getAddr('Z')
    this.retract = this._block.getAddr('R')
    this.feedrate = this._block.getAddr('F')

    this.retractCommand = nc.G[this.getRetractCode()]

    this.G98 = this._block.addresses.indexOf('G98') > -1
    this.G99 = this._block.addresses.indexOf('G99') > -1

    _(['Z', 'R', 'Q', 'F']).forEach((addr) => {
      this[addr] = this._block.getAddr(addr, true)
    })
  }

  getRetractCode() {
    return _.intersection(this._block.addresses, ['G98', 'G99'])[0]
  }
}

module.exports = CannedCycle
