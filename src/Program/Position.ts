import Block from './Block'

import { AXES } from '../Machine'

export const MODALS = {
  RAPID: 'G00',
  FEED: 'G01',
  ABSOLUTE: 'G90',
  INCREMENTAL: 'G91'
}

class Position {
  B: number
  X: number
  Y: number
  Z: number

  constructor (block?: Block) {
    this.B = 0
    this.X = 0
    this.Y = 0
    this.Z = 0

    AXES.forEach(axis => {
      if (block[axis]) this[axis] = block[axis]
    })
  }
}

export default Position
