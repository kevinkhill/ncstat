const regex = {
  nLine: new RegExp('^N([0-9]+)'),
  feedrate: new RegExp('F([0-9]+(?:\\.[0-9]*)?)'),
}

function uncomment(str) {
  return str.replace('(', '').replace(')', '').trim()
}

class Toolpath {
  constructor(line) {
    this.tool = {
      desc: '',
      num: line.match(regex.nLine)[1],
    }

    this.tool.desc = uncomment(line.replace(`N${this.tool.num}`, ''))

    this.lines = []
  }

  hasFeedrates() {
    return this.lines.some(line => regex.feedrate.test(line))
  }

  getFeedrates() {
    const feedrates = []

    this.lines.forEach(line => {
      if (regex.feedrate.test(line)) {
        const feedrate = line.match(regex.feedrate)

        feedrates.push(parseFloat(feedrate[1]))
      }
    })

    return feedrates
  }
}

module.exports = Toolpath
