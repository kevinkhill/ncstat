const gCodeRegex = /G[0-9]+/g
const mCodeRegex = /M[0-9]+/g

class Block {
  constructor(line) {
    this._rawLine = line

    this._mCodes = this._rawLine.match(mCodeRegex)
    this._gCodes = this._rawLine.match(gCodeRegex)
  }

  // modals() {
  //   return
  // }

  hasG(gCode) {
    return _.some(this._gCodes, code => gCode === code)
  }

  hasM(mCode) {
    return _.some(this._mCodes, code => mCode === code)
  }

  getComments() {
    return this._comments
  }
}

module.exports = Block
