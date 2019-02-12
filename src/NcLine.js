function NcLine (line) {
  this.regex = {
    feedrate: new RegExp('F([0-9]+(\.[0-9]*)?)')
  }
  this.line = line

  this.contains = (needle) => line.indexOf(needle) > 0
  this.startsWith = (ltr) => this.line[0] == ltr
  this.hasFeedrate = () => this.regex.feedrate.test(this.line)


  this.match = (regex) => line.match(regex)
  this.replace = (search, replace) => {
    this.line = this.line.replace(search, replace)

    return this
  }
}

module.exports = NcLine
