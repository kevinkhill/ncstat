/* eslint-disable no-prototype-builtins */
const _ = require('lodash')

const nc = require('./NcCodes.js')
const CannedPoint = require('./CannedPoint.js')

const blockSkipRegex = /(^\/[0-9]?)/g
const commentRegex = /\((.+)\)/g

function zeroPadAddress(str) {
  return _.isString(str) ? str[0] + `00${str.slice(1)}`.slice(-2) : ''
}

class CannedCycle {
  constructor(block) {
    ['X', 'Y', 'Z', 'R', 'Q'].forEach((address) => {
      this[address] = block.getAddr(address)
    })

    this.block = block
    this.points = [new CannedPoint(block)]
    this.comment = null
    this.blockSkip = null

    if (blockSkipRegex.test(this.rawLine)) {
      this.blockSkip = this.rawLine.match(blockSkipRegex)
    }

    if (commentRegex.test(this.rawLine)) {
      this.comment = this.rawLine.match(commentRegex)
    }

    const paddedAddr = this.addresses.map(zeroPadAddress)

    _(paddedAddr)
      .filter(addr => nc.G.hasOwnProperty(addr))
      .each((address) => {
        this.programCmds.push(nc.G[address])
      })

    _(paddedAddr)
      .filter(addr => nc.M.hasOwnProperty(addr))
      .each((address) => {
        this.machineCmds.push({
          CMD: nc.M[address],
          ARGS: _.intersection([address], this.addresses),
        })
    })
  }

  __toString() {
    return this.rawLine
  }

  addPoint(point) {
    this.points.push(point)
  }

  modals() {
    return ''
  }

  hasG(gCode) {
    return _.some(this.addresses, code => gCode === code)
  }

  hasM(mCode) {
    return _.some(this.addresses, code => mCode === code)
  }

  getComments() {
    return this.comments
  }
}

module.exports = CannedCycle
