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
    this.fileStream = readline.createInterface({
      input: fs.createReadStream(this.filepath),
      crlfDelay: Infinity
    })
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
          debug.out(colors.blue(`==> Toolpath for ${line}`))

          toolpath = new Toolpath(line.toString())

          this.startToolpath()
        }
      }

      if (this.is('toolpathing') && line !== '') {
        toolpath.lines.push(line)
      }
    }

    return this
  }
}

module.exports = StateMachine.factory(Program, {
  init: 'idle',
  transitions: [
    { name: 'start-toolpath', from: 'idle',   to: 'toolpathing' },
    { name: 'end-toolpath', from: 'toolpathing', to: 'idle'  },

    // { name: 'toolpathing', from: 'idle', to: 'toolpathing'  },
    { name: 'toolchange', from: 'toolpathing', to: 'idle'  },
  ],
  data () {
    return {
      toolpaths: []
    }
  },
  methods: {
    onEndToolpath(lc, toolpath) {
      this.toolpaths.push(toolpath)
    },
  }
})
