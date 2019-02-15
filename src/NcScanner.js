const _ = require('lodash')
const chalk = require('chalk')
const { resolve } = require('path')
const { readdir, stat } = require('fs-extra')

const Program = require('./Program')

async function* getFiles(dir) {
  const subdirs = await readdir(dir)

  for (const subdir of subdirs) {
    const res = resolve(dir, subdir)

    if ((await stat(res)).isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}


class NcScanner {
  constructor(dir, config) {
    this.dir = dir
    this.whitelist = config.whitelist
    this.describeToolpaths = config.describeToolpaths || false

    this.files = []
  }

  getFileCount() {
    return this.files.length
  }

  getToolpathCount () {
    return _.sumBy(this.files, program => {
      return program.toolpaths.length
    })
  }

  async process(callback) {
    for await (const filepath of getFiles(this.dir)) {
      if (
        filepath.toUpperCase().slice(-2) == 'NC' &&
        _.intersection(this.whitelist, filepath.split('/')).length > 0
      ) {
        const program = new Program(filepath)

        console.log('')
        console.log(chalk.green.bold(`Found: ${filepath}`))

        await program.process()

        if (this.describeToolpaths) {
          program.describeToolpaths()
        }

        this.files.push(program)
      }
    }

    if (callback) return callback(this)
  }
}

module.exports = NcScanner
