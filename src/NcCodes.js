const { resolve } = require
const { forEach } = require('lodash')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

const CODES = {
  G: {},
  M: {},
  CANNED_CYCLE_START: [
    'G73', 'G74', 'G81', 'G82', 'G83', 'G84', 'G85', 'G86', 'G87'
  ]
}

const COMMANDS = {
  G: n => CODES.G[`G${n}`],
  M: n => CODES.M[`M${n}`]
}

function readYaml (filepath) {
  return safeLoad(readFileSync(resolve(filepath)))
}

forEach(readYaml('./definitions/gcodes.yml'), (codeGroup, category) => {
  forEach(codeGroup, (command, code) => {
    CODES.G[code] = {
      CMD: command,
      CAT: category
    }
  })
})

forEach(readYaml('./definitions/mcodes.yml'), (command, code) => {
  CODES.M[code] = {
    CMD: command,
    CAT: 'MACHINE'
  }
})

module.exports = {
  CODES, COMMANDS
}
