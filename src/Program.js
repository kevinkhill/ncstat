const _ = require('lodash')
const fs = require('fs')
const colors = require('colors/safe')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const debug = require('./debug')
const NcLine = require('./NcLine')
const Toolpath = require('./Toolpath')


class Program {
  constructor(filepath) {
    this._fsm()
    this.lines = []
    this.filepath = filepath
  }

  async process() {
    let toolpath

    for await (const line of this.fileStream) {
      this.lines.push(line)

      let ncLine = new NcLine(line)

      if (ncLine.startsWith('N')) {
        if (this.is('toolpathing')) {
          this.endToolpath(toolpath)
        }

        if (this.is('idle')) {
          toolpath = new Toolpath(line.toString())

          this.startToolpath()
        }
      }

      if (this.is('toolpathing') && line !== '' && line !== ' ' ) {
        toolpath.lines.push(line)
      }
    }
  }
}

module.exports = StateMachine.factory(Program, {
  init: 'closed',
  transitions: [
    { name: 'open',           from: 'closed',      to: 'idle' },
    { name: 'start-toolpath', from: 'idle',        to: 'toolpathing' },
    { name: 'end-toolpath',   from: 'toolpathing', to: 'idle'  },
  ],
  data () {
    return {
      toolpaths: []
    }
  },
  methods: {
    onBeforeOpen(lc, filepath) {
      this.filepath = filepath
      this.fileStream = readline.createInterface({
        input: fs.createReadStream(this.filepath),
        crlfDelay: Infinity
      })
    },
    onOpen(lc) {
      debug.out('')
      debug.out(colors.green.bold(`Processing ${this.filepath}`))
    },
    onEndToolpath(lc, toolpath) {
      if (toolpath.hasFeedrates()) {
        let feedrates = toolpath.getFeedrates()

        let toolNum = colors.magenta(('   '+toolpath.tool.num).slice(-3))
        let toolDesc = colors.blue((toolpath.tool.desc+'                                                  ').slice(0, 50))

        let minFeedrate = colors.red.bold(_.min(feedrates).toFixed(3))

        let average = _.sum(feedrates) / feedrates.length
        let averageFeedrate = colors.red.bold(average.toFixed(3))

        let maxFeedrate = colors.red.bold(_.max(feedrates).toFixed(3))

        debug.out(toolNum + ' | ' + toolDesc + ' | MIN: ' + minFeedrate + ' AVE: ' + averageFeedrate + ' MAX: ' + maxFeedrate)
      }

      this.toolpaths.push(toolpath)
    },
  }
})
