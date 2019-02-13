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

  outputToolpathStats(toolpath) {
    if (toolpath.hasFeedrates()) {
      let feedrates = toolpath.getFeedrates()

      let toolNum = colors.magenta(('   '+toolpath.tool.num).slice(-3))
      let toolDesc = colors.blue(toolpath.tool.desc)
      let average = _.sum(feedrates) / feedrates.length
      let averageFeedrate = colors.red(average.toFixed(3))

      debug.out(toolNum + ' | ' + toolDesc + ' | ' + averageFeedrate)
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
      debug.out(colors.green.bold(`>> Opening ${this.filepath}`))
    },
    onEndToolpath(lc, toolpath) {
      this.outputToolpathStats(toolpath)

      this.toolpaths.push(toolpath)
    },
  }
})
