const CannedCycle = require('./CannedCycle')

const regex = {
  nLine: /^N([0-9]+)/,
  feedrate: /F([0-9]+(?:\\.[0-9]*)?)/g
}

function uncomment (str) {
  return str.replace('(', '').replace(')', '').trim()
}

class Toolpath {
  constructor (line) {
    this.cannedCycle = null

    this.tool = {
      desc: '',
      num: line.match(regex.nLine)[1]
    }

    this.tool.desc = uncomment(line.replace(`N${this.tool.num}`, ''))

    this.lines = []
  }

  describe () {
    if (this.isCannedCycle()) {
      return this.cannedCycle.describe()
    }

    return 'NOT A CANNED CYCLE'
  }

  isCannedCycle () {
    return this.cannedCycle instanceof CannedCycle
  }

  makeCannedCycle (block) {
    this.cannedCycle = new CannedCycle(block)
  }

  hasFeedrates () {
    return this.lines.some(line => regex.feedrate.test(line))
  }

  getFeedrates () {
    const feedrates = []

    this.lines.forEach((line) => {
      if (regex.feedrate.test(line)) {
        const feedrate = line.match(regex.feedrate)

        feedrates.push(parseFloat(feedrate[1]))
      }
    })

    return feedrates
  }
}

module.exports = Toolpath
