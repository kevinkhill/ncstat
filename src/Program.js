const _ = require('lodash')
const fs = require('fs-extra')
const chalk = require('chalk')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const Block = require('./Block')
const Toolpath = require('./Toolpath')
const Position = require('./Position')

class Program {
  constructor (filepath) {
    // noinspection JSUnresolvedFunction
    this._fsm()
    this._rawLines = []
    this._blocks = []
    this._fileStream = null
    this._position = {
      curr: new Position(),
      prev: new Position()
    }

    this.absinc = Position.ABSOLUTE
    this.rapfeed = Position.RAPID
    this.filepath = filepath
    this.toolpaths = []
  }

  toString () {
    return this._rawLines.join('\n')
  }

  getToolpathCount () {
    return this.toolpaths.length
  }

  getPosition () {
    return this._position.curr
  }

  getPrevPosition () {
    return this._position.prev
  }

  updatePosition (block) {
    this._position.prev = this._position.curr

    this._position.curr = this._position.curr[this.absinc](block)
  }

  async process () {
    this.open()

    let toolpath = null

    for await (const line of this._fileStream) {
      if (line !== '') {
        const block = new Block(line)
        this._blocks.push(block)
        this._rawLines.push(line)

        this._setModals(block)

        if (block.O) {
          this.number = block.O
          this.title = block.comment
        }

        if (block.hasMovement()) {
          this.updatePosition(block)
        }

        if (block.isStartOfCannedCycle() && this.is('toolpathing')) {
          this.startCannedCycle()

          toolpath.makeCannedCycle(block)
        }

        if (block.G80 === true) {
          this.endCannedCycle()
        }

        if (this.is('in-canned-cycle') && block.hasMovement()) {
          toolpath.cannedCycle.addPoint(_.clone(this._position.curr))
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
    }

    this.endToolpath(toolpath)
    this.close()
  }

  describe () {
    let output = `Program #${this.number} ${this.title}\n`
    output += '---------------------------------------------------------------------------------------\n'

    this.toolpaths.forEach((toolpath) => {
      if (toolpath.hasFeedrates()) {
        // const feedrates = toolpath.getFeedrates()

        const toolNum = `  T${toolpath.tool.num}`.slice(-3)

        output += chalk`{magenta ${toolNum}} | {blue ${toolpath.tool.desc}} |`
        output += chalk` {greenBright ${toolpath.cannedCycle.retractCommand}}`
        output += chalk`, {greenBright ${toolpath.cannedCycle.cycleCommand}}`
        output += chalk` with {yellow ${toolpath.cannedCycle.getPointCount()}} points:\n`

        toolpath.cannedCycle.getPoints().forEach(position => {
          output += `X${position.X}, Y${position.Y}\n`
        })

        // const minFeedrate = chalk.red.bold(_.min(feedrates).toFixed(3))

        // const average = _.sum(feedrates) / feedrates.length
        // const averageFeedrate = chalk.red.bold(average.toFixed(3))

        // const meanFeedrate = chalk.red.bold(_.mean(feedrates).toFixed(3))

        // const maxFeedrate = chalk.red.bold(_.max(feedrates).toFixed(3))

        // console.log(`${toolNum} | ${toolDesc} | MIN: ${minFeedrate} MAX: ${maxFeedrate} MEAN: ${meanFeedrate}`)
      }
    })

    console.log(output)
  }

  _setModals (block) {
    if (block.G00) this.rapfeed = Position.RAPID
    if (block.G01) this.rapfeed = Position.FEED

    if (block.G90) this.absinc = Position.ABSOLUTE
    if (block.G91) this.absinc = Position.INCREMENTAL
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
    onEndToolpath (lc, toolpath) {
      this.toolpaths.push(toolpath)
    }
  }
})
