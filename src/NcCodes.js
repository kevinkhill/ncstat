const { resolve } = require
const { forEach } = require('lodash')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

const G_CODES = {}
const M_CODES = {}

const CANNED_CYCLE_START_CODES = [
  'G73', 'G74', 'G81', 'G82', 'G83', 'G84', 'G85', 'G86', 'G87'
]

const COMMANDS = {
  G: n => G_CODES[`G${n}`],
  M: n => M_CODES[`M${n}`]
}

function readYaml (filepath) {
  return safeLoad(readFileSync(resolve(filepath)))
}

forEach(readYaml('./definitions/gcodes.yml'), (groupName, group) => {
  forEach(groupName, (command, gcode) => {
    G_CODES[gcode] = {
      COMMAND: command,
      GROUP: group
    }
  })
})

forEach(readYaml('./definitions/mcodes.yml'), (command, mcode) => {
  M_CODES[mcode] = {
    COMMAND: command,
    GROUP: 'MACHINE'
  }
})

module.exports = {
  G_CODES,
  M_CODES,
  COMMANDS,
  CANNED_CYCLE_START_CODES
}
