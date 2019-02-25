/* eslint-disable no-prototype-builtins */
const _ = require('lodash')

const nc = require('./NcCodes')

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

    // _.forEach(nc.G, (addr, code) => {
    //   this[code] = addr
    // })

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
          ARGS: _.intersection([address], this.addresses)
        })
      })
  }

  __toString () {
    return this.rawLine
  }

  getAddr (prefix, cast = false) {
    const code = _.find(this.addresses, address => address[0] === prefix)

    if (code) {
      const value = code.slice(1)

      if (cast) {
        return code.indexOf('.') > -1 ? parseFloat(value) : parseInt(value)
      }

      return code
    }

    return null
  }

  getCannedCycleStartCode () {
    const cycle = _.intersection(this.addresses, nc.CANNED_CYCLE_START)

    return cycle ? cycle[0] : null
  }

  isStartOfCannedCycle () {
    return this.getCannedCycleStartCode() != null
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
