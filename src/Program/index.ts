const _ = require('lodash')
const fs = require('fs')
const chalk = require('chalk')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

import Block from './Block'
import Toolpath from './Toolpath'
import CannedCycle from './CannedCycle'
import Position, { MODALS } from './Position'

const transitions = [
  { name: 'start-toolpath', from: 'idle', to: 'toolpathing' },
  { name: 'end-toolpath', from: 'toolpathing', to: 'idle' },

  { name: 'start-canned-cycle', from: 'toolpathing', to: 'in-canned-cycle' },
  { name: 'end-canned-cycle', from: 'in-canned-cycle', to: 'toolpathing' }
]

interface Program {
  is(state: string): any
  startToolpath(): any
  endToolpath(): any
  endCannedCycle(): any
  startCannedCycle(): any
}

class Program {
  _fsm: any;
  _rawLines: Array<string>;
  _blocks: Array<any>;
  _fileStream: any;
  _rapfeed: any;
  _absinc: any;
  _position: { curr: any, prev: any }

  title: string;
  number: number;

  toolpaths: Array<any>;

  constructor (filepath: string) {
    // noinspection JSUnresolvedFunction
    this._fsm()
    this._rawLines = []
    this._blocks = []
    this._fileStream = readline.createInterface({
      input: fs.createReadStream(filepath),
      crlfDelay: Infinity
    })
    this._position = {
      curr: new Position(),
      prev: new Position()
    }
    this._absinc = MODALS.ABSOLUTE

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
    const axes = ['B', 'X', 'Y', 'Z']
    const position = block.getPosition()

    this._position.prev = this._position.curr

    axes.forEach(axis => {
      if (position[axis]) {
        if (this._absinc === MODALS.INCREMENTAL) {
          this._position.curr[axis] += position[axis]
        }

        if (this._absinc === MODALS.ABSOLUTE) {
          this._position.curr[axis] = position[axis]
        }
      }
    })
  }

  async process () {
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

          const cannedCycle = new CannedCycle(block)

          toolpath.cannedCycles.push(cannedCycle)
        }

        if (this.is('in-canned-cycle') && block.G80 === true) {
          this.endCannedCycle()
        }

        if (this.is('in-canned-cycle') && block.hasMovement()) {
          const point = _.clone(this._position.curr)

          _.last(toolpath.cannedCycles).addPoint(point)
        }

        if (line[0] === 'N') {
          if (this.is('toolpathing')) {
            this.endToolpath()
            this.toolpaths.push(toolpath)
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

    this.endToolpath()
    this.toolpaths.push(toolpath)
  }

  describe (options) {
    let output = `Program #${this.number} ${this.title}\n`
    output += '---------------------------------------------------------------------------------------\n'

    this.toolpaths.forEach((toolpath) => {
      if (toolpath.hasFeedrates()) {
        // const feedrates = toolpath.getFeedrates()

        output += chalk`{magenta T${_.padEnd(toolpath.tool.num, 3)}} | {blue ${toolpath.tool.desc}}\n`

        if (options.cannedCycles && toolpath.cannedCycles.length > 0) {
          toolpath.cannedCycles.forEach(cannedCycle => {
            output += chalk`{greenBright ${cannedCycle.retractCommand}}`
            output += chalk`, {greenBright ${cannedCycle.cycleCommand}}`
            output += chalk` with {yellow ${cannedCycle.getPointCount()}} points\n`

            if (options.cannedPoints) {
              cannedCycle
                .getPoints()
                .forEach(position => {
                  output += `X${position.X}, Y${position.Y}\n`
                })
            }
          })
        }

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
    if (block.G00) this._rapfeed = MODALS.RAPID
    if (block.G01) this._rapfeed = MODALS.FEED

    if (block.G90) this._absinc = MODALS.ABSOLUTE
    if (block.G91) this._absinc = MODALS.INCREMENTAL
  }
}

export default StateMachine.factory(Program, {
  init: 'idle', transitions
})
