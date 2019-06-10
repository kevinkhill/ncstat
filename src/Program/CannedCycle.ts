import { intersection, flatten } from 'lodash'

import Block from './Block'
import { CANNED_CYCLE_START_CODES } from '../NcCodes'

export const CANNED_CYCLE_ARGS = ['Z', 'R', 'Q', 'F']

export default class CannedCycle {
  private block: Block
  _points = []

  peck: any
  depth: any
  retract: any
  feedrate: any

  cycleCommand: any
  retractCommand: any

  G98?: any
  G99?: any

  constructor (block) {
    this.block = block
    this._points = []

    this.peck = this.block.getAddress('Q')
    this.depth = this.block.getAddress('Z')
    this.retract = this.block.getAddress('R')
    this.feedrate = this.block.getAddress('F')

    this.cycleCommand = flatten(intersection(this.block.addresses, CANNED_CYCLE_START_CODES))
    this.retractCommand = flatten(intersection(this.block.addresses, ['G98', 'G99']))

    this.G98 = this.block.addresses.indexOf('G98') > -1
    this.G99 = this.block.addresses.indexOf('G99') > -1

    CANNED_CYCLE_ARGS.forEach((ltr) => {
      this[ltr] = this.block.getAddress(ltr, true)
    })
  }

  addPoint (point) {
    const position = point instanceof Block ? point.getPosition() : point

    this._points.push(position)
  }

  getPoints () {
    return this._points
  }

  getPointCount () {
    return this._points.length
  }
}
