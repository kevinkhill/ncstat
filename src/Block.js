/* eslint-disable no-prototype-builtins */
const _ = require('lodash')

const { CODES } = require('./NcCodes')
const Position = require('./Position')

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
    this.machineCmds = []
    this.programCmds = []
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

    const paddedAddr = this.addresses.map(zeroPadAddress)

    _(paddedAddr)
      .filter(addr => CODES.G.hasOwnProperty(addr))
      .each((address) => {
        this.programCmds.push(CODES.G[address])
      })

    _(paddedAddr)
      .filter(addr => CODES.M.hasOwnProperty(addr))
      .each((address) => {
        this.machineCmds.push({
          CMD: CODES.M[address],
          ARGS: _.intersection([address], this.addresses)
        })
      })
  }

  getPosition () {
    return new Position(this)
  }

  isStartOfCannedCycle () {
    return this.getCannedCycleStartCode() != null
  }

  hasMovement () {
    const hasBXYZ = _.isNumber(this.B) || _.isNumber(this.X) || _.isNumber(this.Y) || _.isNumber(this.Z)

    return hasBXYZ && (this.G10 !== true && this.G04 !== true)
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
    const cycle = _.intersection(this.addresses, CODES.CANNED_CYCLE_START)

    return cycle ? cycle[0] : null
  }

  getMachineCommands () {
    return this.machineCmds
  }

  getProgramCommands () {
    return this.programCmds
  }

  _mapAddressValuesToObj () {
    const keys = Object.keys({ ...CODES.G, ...CODES.M })

    // Map found G & M addresses to true on the block
    keys.forEach(addr => {
      if (this.addresses.includes(addr)) {
        this[addr] = true
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
