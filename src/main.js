const _ = require('lodash')

const Program = require('./Program')
const forEachNcFileInWhitelist = require('./forEachNcFileInWhitelist')

const dirWhitelist = [
  'HB PARTS',
  'JOB SPECIFIC',
]

async function createProgram (filepath) {
  let program = new Program(filepath)

  await program.process()

  return program
}

async function getPrograms(cb) {
  cb(await forEachNcFileInWhitelist(createProgram, dirWhitelist))
}

/**
 * Main Program
 */
try {
  getPrograms(programs => {
    let toolpathCount = _.sumBy(programs, program => {
      return program.toolpaths.length
    })

    console.log('')
    console.log(`Analyzed ${toolpathCount} toolpaths in ${programs.length} NC files.`)
  })
} catch (err) {
  console.error(err)
}
