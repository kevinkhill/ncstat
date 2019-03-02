/* eslint-disable no-prototype-builtins */
const _ = require('lodash')

const Position = require('./Position')
const { CANNED_CYCLE_START_CODES } = require('./NcCodes')

const addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g
const blockSkipRegex = /(^\/[0-9]?)/
const commentRegex = /\(\s?(.+)\s?\)/

function zeroPadAddress (str) {
  return _.isString(str) ? str[0] + `00${str.slice(1)}`.slice(-2) : ''
}

class Block {
  constructor (line) {
    this.rawLine = line
    this.addresses = this.rawLine.match(addressRegex) || []
    this.comment = null
    this.blockSkip = null

    this._mapAddressValuesToObj()

    if (blockSkipRegex.test(this.rawLine)) {
      let match = this.rawLine.match(blockSkipRegex)

      if (match) this.blockSkip = match[1]
    }

    if (commentRegex.test(this.rawLine)) {
      let match = this.rawLine.match(commentRegex)

      if (match) this.comment = match[1]
    }
  }

  getPosition () {
    return new Position(this)
  }

  isStartOfCannedCycle () {
    return this.getCannedCycleStartCode() != null
  }

  hasMovement () {
    if (this.G10 === true || this.G04 === true || this.G65 === true) return false

    return _.isNumber(this.B) || _.isNumber(this.X) || _.isNumber(this.Y) || _.isNumber(this.Z)
  }

  hasAddress (ltr) {
    return _.find(this.addresses, address => address[0] === ltr) !== undefined
  }

  getAddress (ltr, cast = false) {
    if (this.hasAddress(ltr)) {
      const code = _.find(this.addresses, address => address[0] === ltr)

      if (code) {
        const value = code.slice(1)

        if (cast) {
          return code.indexOf('.') > -1 ? parseFloat(value) : parseInt(value)
        }

        return code
      }
    }

    return null
  }

  getCannedCycleStartCode () {
    const cycle = _.intersection(this.addresses, CANNED_CYCLE_START_CODES)

    return cycle.length > 0 ? cycle[0] : null
  }

  _mapAddressValuesToObj () {
    // Map found G & M addresses to true on the block
    this.addresses.forEach(addr => {
      if (addr[0] === 'G' || addr[0] === 'M') {
        if (parseInt(addr.slice(1)) < 10) {
          this[zeroPadAddress(addr)] = true
        } else {
          this[addr] = true
        }
      }
    })

    // Map all found Letter addresses to their cast values on the block
    'ABCDEFHIJKLNOPQRSTUVWXYZ'.split('').forEach((ltr) => {
      if (this.hasAddress(ltr)) {
        this[ltr] = this.getAddress(ltr, true)
      }
    })
  }
}

module.exports = Block
