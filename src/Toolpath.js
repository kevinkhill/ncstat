const nLineRegex = /^N([0-9]+)/
const feedrateRegex = /F([0-9]+(?:\\.[0-9]*)?)/g

function uncomment (str) {
  return str.replace('(', '').replace(')', '').trim()
}

class Toolpath {
  constructor (line) {
    this.lines = []
    this.cannedCycles = []

    this.tool = {
      desc: '',
      num: line.match(nLineRegex)[1]
    }

    this.tool.desc = uncomment(line.replace(`N${this.tool.num}`, ''))
  }

  hasFeedrates () {
    return this.lines.some(line => feedrateRegex.test(line))
  }

  getFeedrates () {
    const feedrates = []

    this.lines.forEach((line) => {
      if (feedrateRegex.test(line)) {
        const feedrate = line.match(feedrateRegex)

        feedrates.push(parseFloat(feedrate[1]))
      }
    })

    return feedrates
  }

  getCannedCycleCount () {
    return this.cannedCycles.length
  }
}

module.exports = Toolpath
