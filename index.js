const sumBy = require('lodash/sumBy')
const NcFileCollector = require('./src/NcFileCollector')

const collector = new NcFileCollector({
  dir: '/mnt/c/H+405 PROGRAM VAULT',
  whitelist: [
    '96',
    // 'HB PARTS',
    // 'JOB SPECIFIC',
  ]
})

function getToolpathCount (programs) {
  return sumBy(programs, program => {
    return program.toolpaths.length
  })
}

(async (collector) => {
  try {
    await collector.getPrograms()

    const toolpathCount = getToolpathCount(collector.files)

    console.log(`\nAnalyzed ${toolpathCount} toolpaths in ${collector.files.length} NC files`)
  } catch (err) {
    console.error(err)
  }

})(collector)
