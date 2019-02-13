const Program = require('./Program')
const forEachNcFileInWhitelist = require('./forEachNcFileInWhitelist')

const dirWhitelist = [
  '94'
  // 'HB PARTS',
  // 'JOB SPECIFIC'
]

async function createProgram (filepath) {
  let program = new Program()

  program.open(filepath)

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
    console.log(`Processed ${programs.length} NC files.`)
  })
} catch (err) {
  console.error(err)
}
