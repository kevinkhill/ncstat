const nLineRegex = new RegExp('^N([0-9]+)')

function uncomment(str) {
  return str.replace('(', '').replace(')', '').trim()
}

class Toolpath {
  constructor(line) {
    this.t = line.match(nLineRegex)[1];
    this.toolDesc = uncomment(line.replace(`N${this.t}`, ''));
    this.lines = [];
  }
}

module.exports = Toolpath
