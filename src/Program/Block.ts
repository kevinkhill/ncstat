/// <reference path="../../typings/Block.d.ts" />

import { find, isNumber, intersection } from 'lodash'

import Position from './Position'
import { CANNED_CYCLE_START_CODES } from '../NcCodes'

const blockSkipRegex: RegExp = /(^\/[0-9]?)/;
const commentRegex: RegExp = /\(\s?(.+)\s?\)/;
const addressRegex: RegExp = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;

function zeroPadAddress (str: string) : string {
  return (str ? str[0] + `00${str.slice(1)}`.slice(-2) : '');
}

interface Block {
  G04?: boolean
  G10?: boolean
  G65?: boolean
  G80?: boolean
  G98?: boolean
  G99?: boolean

  B?: number
  O?: number
  X?: number
  Y?: number
  Z?: number
}

class Block {
  rawLine: string
  comment: string
  blockSkip: string
  addresses: Array<string>

  constructor (line: any) {
    this.rawLine = line
    this.comment = null
    this.blockSkip = null
    this.addresses = this.rawLine.match(addressRegex) || []

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

  getPosition (): Position {
    return new Position(this)
  }

  isStartOfCannedCycle (): boolean {
    return this.getCannedCycleStartCode() != null
  }

  hasMovement (): boolean {
    if (this.G10 === true || this.G04 === true || this.G65 === true) return false

    return isNumber(this.B) || isNumber(this.X) || isNumber(this.Y) || isNumber(this.Z)
  }

  hasAddress (ltr: string): boolean {
    return find(this.addresses, address => address[0] === ltr) !== undefined
  }

  getAddress (ltr: string, cast: boolean = true) {
    if (this.hasAddress(ltr)) {
      const code = find(this.addresses, address => address[0] === ltr)

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
    const cycle = intersection(this.addresses, CANNED_CYCLE_START_CODES)

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

export default Block
