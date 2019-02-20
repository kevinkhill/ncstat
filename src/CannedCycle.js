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

    this._block = block
    this._points = [new CannedPoint(block)]
    this._comment = null
    this._blockSkip = null

    if (blockSkipRegex.test(this._rawLine)) {
      this._blockSkip = this._rawLine.match(blockSkipRegex)
    }

    if (commentRegex.test(this._rawLine)) {
      this._comment = this._rawLine.match(commentRegex)
    }

    const paddedAddr = this._addresses.map(zeroPadAddress)

    _(paddedAddr)
      .filter(addr => nc.G.hasOwnProperty(addr))
      .each((address) => {
        this._programCmds.push(nc.G[address])
      })

    _(paddedAddr)
      .filter(addr => nc.M.hasOwnProperty(addr))
      .each((address) => {
        this._machineCmds.push({
          CMD: nc.M[address],
          ARGS: _.intersection([address], this._addresses),
        })
    })
  }

  __toString() {
    return this._rawLine
  }

  addPoint(point) {
    this._points.push(point)
  }

  modals() {
    return ''
  }

  hasG(gCode) {
    return _.some(this._addresses, code => gCode === code)
  }

  hasM(mCode) {
    return _.some(this._addresses, code => mCode === code)
  }

  getComments() {
    return this._comments
  }
}

module.exports = CannedCycle
