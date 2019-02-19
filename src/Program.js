const _ = require('lodash')
const fs = require('fs-extra')
const chalk = require('chalk')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const Block = require('./Block')
const Toolpath = require('./Toolpath')


class Program {
  constructor(filepath) {
    // eslint-disable-next-line no-underscore-dangle
    this._fsm()
    this.lines = []
    this.blocks = []
    this.filepath = filepath
  }

  __toString() {
    return this.lines.join('\n')
  }

  describeToolpaths() {
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

  async process() {
    this.open()

    let toolpath = null

    for await (const line of this.fileStream) {
      this.lines.push(line)
      this.blocks.push(new Block(line))

      if (line[0] === 'N') {
        if (this.is('toolpathing')) {
          this.endToolpath(toolpath)
        }

        if (this.is('idle')) {
          toolpath = new Toolpath(line)

          this.startToolpath()
        }
      }

      if (this.is('toolpathing') && line !== '' && line !== ' ') {
        toolpath.lines.push(line)
      }
    }

    this.endToolpath(toolpath)
    this.close()
  }
}

module.exports = StateMachine.factory(Program, {
  init: 'closed',
  transitions: [
    { name: 'open',           from: 'closed',      to: 'idle' },
    { name: 'start-toolpath', from: 'idle',        to: 'toolpathing' },
    { name: 'end-toolpath',   from: 'toolpathing', to: 'idle' },
    { name: 'close',          from: '*',           to: 'closed' },
  ],
  data(filepath) {
    return {
      filepath,
      toolpaths: [],
    }
  },
  methods: {
    onBeforeOpen() {
      this.fileStream = readline.createInterface({
        input: fs.createReadStream(this.filepath),
        crlfDelay: Infinity,
      })
    },
    onOpen() {
      //
    },
    onClose() {
      //
    },
    onEndToolpath(lc, toolpath) {
      this.toolpaths.push(toolpath)
    },
  },
})
