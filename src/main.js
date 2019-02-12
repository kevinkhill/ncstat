
(async () => {
  const Program = require('./Program')
  const { forEachNcFileInWhitelist } = require('./forEachNcFileInWhitelist')

  try {
    const programs = []

    await forEachNcFileInWhitelist(async (filepath) => {
      let program = new Program(filepath)

      await program.process()

      programs.push(program)
    }, [
      'RD81-14-2-11-XX',
      // 'HB PARTS',
      // 'JOB SPECIFIC'
    ])

    console.log(programs)
  } catch (err) {
    console.error(err)
  }
})()
