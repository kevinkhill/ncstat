const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const Program = require('./Program')

async function* getFiles(dir) {
  const subdirs = await fs.readdir(dir)

  for (const subdir of subdirs) {
    const res = path.resolve(dir, subdir)

    if ((await fs.stat(res)).isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

function consoleWriter(str) {
  return process.stdout.write(`${str}\n`)
}

class NcScanner {
  constructor(fileOrDir, config) {
    this.files = []

    this.output = config.outputStream || consoleWriter
    this.whitelist = config.whitelist
    this.describeToolpaths = config.describeToolpaths || false

    if (fs.existsSync(fileOrDir)) {
      this.input = fileOrDir
      console.log(`Scanning ${fileOrDir}`)
    }
  }

  getFileCount() {
    return this.files.length
  }

  getToolpathCount() {
    return _.sumBy(this.files, (program) => {
      return program.toolpaths.length
    })
  }

  async makeProgram(filepath) {
    const program = new Program(filepath)

    this.output('')
    this.output(chalk.green.bold(`Found: ${filepath}`))

    await program.process()

    if (this.describeToolpaths) {
      program.describeToolpaths()
    }

    this.files.push(program)
  }

  async process(callback) {
    if ((await fs.stat(this.input)).isDirectory()) {
      for await (const filepath of getFiles(this.input)) {
        if (
          filepath.toUpperCase().slice(-2) === 'NC'
          && _.intersection(this.whitelist, filepath.split('/')).length > 0
        ) {
          await this.makeProgram(filepath)
        }
      }
    } else {
      await this.makeProgram(this.input)
    }

    if (callback) callback()
  }
}

module.exports = NcScanner
