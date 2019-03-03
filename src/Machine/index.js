const StateMachine = require('javascript-state-machine')

const zeroPos = () => { return { X: 0, Y: 0, Z: 0, B: 0 } }

const transitions = [
  /* eslint-disable */
  { name: 'cycle-start',    from: ['idle', 'paused'], to: 'running' },
  { name: 'feed-hold',      from: 'running',          to: 'paused' },
  { name: 'cycle-complete', from: 'running',          to: 'idle' }
  /* eslint-enable */
]

const data = {
  offsets: {
    G54: zeroPos(),
    G55: zeroPos(),
    G56: zeroPos(),
    G57: zeroPos(),
    G58: zeroPos(),
    G59: zeroPos()
  },
  position: {
    ...zeroPos(),
    prev: zeroPos()
  },
  spindle: {
    state: '',
    rpms: 0
  },
  feedrate: 0
}

const methods = {
  /**
   * @return {number}
   */
  S () {
    return this.spindle.rpms
  },
  /**
   * @return {number}
   */
  F () {
    return this.feedrate
  },
  onInit () {
    //
  },
  onCycleStart () {
    //
  },
  onFeedHold () {
    //
  },
  onCycleComplete() {
    //
  }
}

module.exports = new StateMachine({
  init: 'idle', transitions, data, methods
})
