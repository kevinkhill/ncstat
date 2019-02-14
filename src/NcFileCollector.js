const { resolve } = require('path')
const { readdir, stat } = require('fs-extra')
const intersection = require('lodash/intersection')

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

class NcFileCollector {
  constructor(config) {
    this.files = []

    this.dir = config.dir
    this.whitelist = config.whitelist || []
  }

  async getPrograms() {
    for await (const filepath of getFiles(this.dir)) {
      if (
        filepath.toUpperCase().slice(-2) == 'NC' &&
        intersection(this.whitelist, filepath.split('/')).length > 0
      ) {
        const program = new Program(filepath)

        await program.process()

        this.files.push(program)
      }
    }
  }
}

module.exports = NcFileCollector
