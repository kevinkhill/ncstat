const Program = require('./Program')
const forEachNcFileInWhitelist = require('./forEachNcFileInWhitelist')

const dirWhitelist = [
  'HB PARTS',
  // 'JOB SPECIFIC'
]

async function createProgram (filepath) {
  let program = new Program(filepath)

  await program.process()

  return program
}

async function getPrograms(cb) {
  const programs = await forEachNcFileInWhitelist(createProgram, dirWhitelist)

  cb(programs)
}

try {
  getPrograms(programs => {
    console.log('DONE!')
    console.log(`Processed ${programs.length} NC files.`)
  })
} catch (err) {
  console.error(err)
}
