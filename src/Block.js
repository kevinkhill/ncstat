/* eslint-disable no-prototype-builtins */
const _ = require('lodash')

const { CODES } = require('./NcCodes')

const addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g
const blockSkipRegex = /(^\/[0-9]?)/g
const commentRegex = /\((.+)\)/g

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

    // Map found G & M addresses to true on the block
    Object.keys(CODES.G).concat(Object.keys(CODES.M)).forEach(addr => {
      if (this.addresses.includes(addr)) {
        this[addr] = true
      }
    })

    // Map all found Letter addresses to their cast values on the block
    'ABCDEFHIJKLNOPQRSTUVWXYZ'.split('').forEach((ltr) => {
      // console.log(addr)
      if (this.hasAddress(ltr)) {
        this[ltr] = this.getAddress(ltr, true)
      }
    })

    if (blockSkipRegex.test(this.rawLine)) {
      this.blockSkip = this.rawLine.match(blockSkipRegex)
    }

    if (commentRegex.test(this.rawLine)) {
      this.comment = this.rawLine.match(commentRegex)
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

  toString () {
    return this.rawLine
  }

  isStartOfCannedCycle () {
    return this.getCannedCycleStartCode() != null
  }

  hasMovement () {
    return _.isNumber(this.B) ||
      _.isNumber(this.X) ||
      _.isNumber(this.Y) ||
      _.isNumber(this.Z)
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

  getComments () {
    return this.comments
  }

  getMachineCommands () {
    return this.machineCmds
  }

  getProgramCommands () {
    return this.programCmds
  }
}

module.exports = Block
