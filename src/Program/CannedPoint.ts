import Point from './Point'
import Block from './Block'

export default class CannedPoint extends Point {
  R: number
  
  static getfactory (cannedCycle) {
    function pointFactory () {

    }

    return pointFactory
  }

  constructor (block: Block, cannedCycle) {
    super()
  }

  setRetract (r: number): void {
    this.R = r
  }
}
