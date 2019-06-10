import Block from './Block'

export const MODALS = {
  RAPID: 'G00',
  FEED: 'G01',
  ABSOLUTE: 'G90',
  INCREMENTAL: 'G91'
}

class Position {
  B: number = 0
  X: number = 0
  Y: number = 0
  Z: number = 0

  constructor (block?: Block) {
    if (block) {
      ['B', 'X', 'Y', 'Z'].forEach(axis => {
        if (block.hasAddress(axis)) this[axis] = block.getAddress(axis)
      })
    }
  }
}

export default Position
