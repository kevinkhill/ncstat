const _ = require('lodash')
const fs = require('fs-extra')
const chalk = require('chalk')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const Block = require('./Block')
const Toolpath = require('./Toolpath')

const l=console.log

class Program {
  constructor (filepath) {
    // eslint-disable-next-line no-underscore-dangle
    this._fsm()
    this._rawLines = []
    this._blocks = []
    this._fileStream = null
    this._position = {
      prev: { B: null, X: null, Y: null, Z: null },
      curr: { B: null, X: null, Y: null, Z: null }
    }

    this.toolpaths = []
    this.filepath = filepath
  }

  toString () {
    return this._rawLines.join('\n')
  }

  getToolpathCount () {
    return this.toolpaths.length
  }

  async process () {
    this.open()

    let toolpath = null

    for await (const line of this._fileStream) {
      this._rawLines.push(line)

      const block = new Block(line)
      this._blocks.push(block)

      // l(block.hasMovement(), [block.B, block.X, block.Y, block.Z])

      if (block.hasMovement()) {
        // TODO this logic needs to be incremental instead of overwriting
        this._position.prev = this._position.curr
        this._position.curr = block
      }

      if (block.isStartOfCannedCycle() && this.is('toolpathing')) {
        toolpath.makeCannedCycle(block)

        this.startCannedCycle()
      }

      if (this.is('in-canned-cycle') && block.hasMovement()) {
        toolpath.cannedCycle.addPoint(this._position.curr)
      }

      if (block.G80 === true) {
        this.endCannedCycle()
      }

      if (line[0] === 'N') {
        if (this.is('toolpathing')) {
          this.endToolpath(toolpath)
        }

        if (this.is('idle')) {
          toolpath = new Toolpath(line)

          this.startToolpath()
        }
      }

      // If we're toolpathing and `line` is not empty, save it to the toolpath
      if (
        (this.is('toolpathing') || this.is('in-canned-cycle')) &&
        line !== '' && line !== ' '
      ) {
        toolpath.lines.push(line)
      }
    }

    this.endToolpath(toolpath)
    this.close()
  }

  describeToolpaths () {
    console.log('Toolpaths:')

    // console.log(this.toolpaths)

    this.toolpaths.forEach((toolpath) => {
      if (toolpath.hasFeedrates()) {
        const feedrates = toolpath.getFeedrates()

        const toolNum = chalk.magenta((`  T${toolpath.tool.num}`).slice(-3))
        const toolDesc = chalk.blue((`${toolpath.tool.desc}                                        `).slice(0, 40))

        const minFeedrate = chalk.red.bold(_.min(feedrates).toFixed(3))

        // const average = _.sum(feedrates) / feedrates.length
        // const averageFeedrate = chalk.red.bold(average.toFixed(3))

        const meanFeedrate = chalk.red.bold(_.mean(feedrates).toFixed(3))

        const maxFeedrate = chalk.red.bold(_.max(feedrates).toFixed(3))

        console.log(`${toolNum} | ${toolDesc} | MIN: ${minFeedrate} MAX: ${maxFeedrate} MEAN: ${meanFeedrate}`)
      }
    })

    console.log(`Processed: ${this.toolpaths.length} toolpaths`)
  }
}

module.exports = StateMachine.factory(Program, {
  init: 'closed',
  transitions: [
    { name: 'open', from: 'closed', to: 'idle' },
    { name: 'close', from: '*', to: 'closed' },

    { name: 'start-toolpath', from: 'idle', to: 'toolpathing' },
    { name: 'end-toolpath', from: 'toolpathing', to: 'idle' },

    { name: 'start-canned-cycle', from: 'toolpathing', to: 'in-canned-cycle' },
    { name: 'end-canned-cycle', from: 'in-canned-cycle', to: 'toolpathing' }
  ],
  methods: {
    onBeforeOpen () {
      this._fileStream = readline.createInterface({
        input: fs.createReadStream(this.filepath),
        crlfDelay: Infinity
      })
    },
    onOpen () {
      //
    },
    onClose () {
      //
    },
    onStartCannedCycle (lc, toolpath) {
      //
    },
    onEndToolpath (lc, toolpath) {
      this.toolpaths.push(toolpath)
    }
  }
})
