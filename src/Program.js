const fs = require('fs')
const readline = require('readline')
const StateMachine = require('javascript-state-machine')

const NcLine = require('./NcLine')
const Toolpath = require('./Toolpath')

function ncLine (line) {
  this.regex = {
    feedrate: new RegExp('F([0-9]+(\.[0-9]*)?)')
  }

  this.line = line

  this.contains = (needle) => line.indexOf(needle) > 0
  this.startsWith = (ltr) => this.line[0] == ltr
  this.hasFeedrate = () => this.regex.feedrate.test(this.line)
}

module.exports = StateMachine.factory({
  init: 'closed',
  transitions: [
    { name: 'process',  from: 'closed', to: 'idle' },
    { name: 'done',  from: 'toolpathing', to: 'done' },
    { name: 'close', from: 'idle',   to: 'closed' },

    { name: 'start-toolpath', from: 'idle',   to: 'toolpathing' },
    // { name: 'end-toolpath', from: 'toolpathing', to: 'idle'  },

    // { name: 'toolpathing', from: 'idle', to: 'toolpathing'  },
    { name: 'toolchange', from: 'toolpathing', to: 'idle'  },
  ],
  data (filepath) {
    return {
      filepath,
      toolpaths: [],
      readlineStream: null
    }
  },
  methods: {
    async onProcess() {
      let readlineStream = readline.createInterface({
        input: fs.createReadStream(this.filepath),
        crlfDelay: Infinity
      })

      let toolpath

      try {
        for await (const line of this.readlineStream) {
          let ncLine = new NcLine(line)

          if (ncLine.startsWith('N')) {
            if (this.is('idle')) {
              toolpath = new Toolpath(line.toString())

              this.startToolpath()
            }

            if (this.is('toolpathing')) {
              this.toolchange(toolpath)
            }
          }

          if (this.is('toolpathing') && line !== '') {
            toolpath.lines.push(line)
          }
        }
      } catch (err) {
        console.error(err)
      }
    },
    async onToolchange(lc, toolpath) {
      console.log(toolpath)
      this.state.toolpaths.push(toolpath)
    },
    async onIdle() {

    },
  }
})
