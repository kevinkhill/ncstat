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
  const programs = await forEachNcFileInWhitelist(createProgram, dirWhitelist)

  cb(programs)
}

function processToolpath (program) {
  return program.toolpaths[0]
}

/**
 * Main Program
 */
try {
  getPrograms(programs => {
    console.log(`Processed ${programs.length} NC files.`)

    // programs.forEach(processToolpath)

    // let result = processToolpath(programs[0])

    // console.log(result)
  })
} catch (err) {
  console.error(err)
}
