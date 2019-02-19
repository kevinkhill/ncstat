const _ = require('lodash')

const G_CODES = require('./g-codes')
const M_CODES = require('./m-codes')

const addressRegex = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g
const blockSkipRegex = /(^\/[0-9]?)/g
const commentRegex = /\((.+)\)/g

function zeroPad(str) {
  const addr = str[0]
  const nums = str.slice(1)
  const paddedNums = `00${nums}`.slice(-2)

  return `${addr}${paddedNums}`
}

class Block {
  constructor(line) {
    this._machineInstructions = []
    this._programInstructions = []
    this._rawLine = line

    this._addresses = this._rawLine.match(addressRegex) || []

    if (blockSkipRegex.test(this._rawLine)) {
      this._blockSkip = this._rawLine.match(blockSkipRegex)
    }

    if (commentRegex.test(this._rawLine)) {
      this._comment = this._rawLine.match(commentRegex)
    }

    this._mCodes = _.filter(this._addresses, addr => addr[0] === 'M')
    this._gCodes = _.filter(this._addresses, addr => addr[0] === 'G')

    _.each(_.concat(this._gCodes, this._mCodes), (addr) => {
      const paddedAddr = zeroPad(addr)

      // eslint-disable-next-line no-prototype-builtins
      if (G_CODES.hasOwnProperty(paddedAddr)) {
        this._programInstructions.push(G_CODES[paddedAddr])
      }

      // eslint-disable-next-line no-prototype-builtins
      if (M_CODES.hasOwnProperty(paddedAddr)) {
        this._machineInstructions.push({
          instruction: M_CODES[paddedAddr],
          args: _.intersection([paddedAddr], this._addresses)
        })
      }

      return paddedAddr
    })
  }

  __toString() {
    return this._rawLine
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

module.exports = Block
