const _ = require('lodash')
const fs = require('fs')
const colors = require('colors/safe')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const debug = require('./debug')
const Toolpath = require('./Toolpath')


class Program {
  constructor(filepath) {
    this._fsm()
    this.lines = []
    this.filepath = filepath
  }

  async process() {
    this.open()

    let toolpath

    for await (const line of this.fileStream) {
      this.lines.push(line)

      if (line[0] == 'N') {
        if (this.is('toolpathing')) {
          this.endToolpath(toolpath)
        }

        if (this.is('idle')) {
          toolpath = new Toolpath(line)

          this.startToolpath()
        }
      }

      if (this.is('toolpathing') && line !== '' && line !== ' ' ) {
        toolpath.lines.push(line)
      }
    }

    this.close()
  }
}

module.exports = StateMachine.factory(Program, {
  init: 'closed',
  transitions: [
    { name: 'open',           from: 'closed',      to: 'idle'},
    { name: 'start-toolpath', from: 'idle',        to: 'toolpathing'},
    { name: 'end-toolpath',   from: 'toolpathing', to: 'idle'},
    { name: 'close',          from: '*',           to: 'closed'},
  ],
  data (filepath) {
    return {
      filepath,
      toolpaths: []
    }
  },
  methods: {
    onBeforeOpen(lc, filepath) {
      this.fileStream = readline.createInterface({
        input: fs.createReadStream(this.filepath),
        crlfDelay: Infinity
      })
    },
    onOpen(lc) {
      debug.out('')
      debug.out(colors.green.bold(`Opening ${this.filepath}`))
    },
    onClose() {
      debug.out(`Processed ${this.toolpaths.length} toolpaths.`)
    },
    onEndToolpath(lc, toolpath) {
      if (toolpath.hasFeedrates()) {
        let feedrates = toolpath.getFeedrates()

        let toolNum = colors.magenta(('   '+toolpath.tool.num).slice(-3))
        let toolDesc = colors.blue((toolpath.tool.desc+'                                        ').slice(0, 40))

        let minFeedrate = colors.red.bold(_.min(feedrates).toFixed(3))

        // let average = _.sum(feedrates) / feedrates.length
        // let averageFeedrate = colors.red.bold(average.toFixed(3))

        let meanFeedrate = colors.red.bold(_.mean(feedrates).toFixed(3))

        let maxFeedrate = colors.red.bold(_.max(feedrates).toFixed(3))

        debug.out(toolNum + ' | ' + toolDesc + ' | MIN: ' + minFeedrate + ' MAX: ' + maxFeedrate + ' MEAN: ' + meanFeedrate)
      }

      this.toolpaths.push(toolpath)
    }
  }
})
