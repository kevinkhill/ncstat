import { forEach } from 'lodash'

export const G_CODES = {}
export const M_CODES = {}

export const CANNED_CYCLE_START_CODES = [
  'G73', 'G74', 'G81', 'G82', 'G83', 'G84', 'G85', 'G86', 'G87'
]

export const COMMANDS = {
  G: n => G_CODES[`G${n}`],
  M: n => M_CODES[`M${n}`]
}

const gcodes = require('./gcodes.json')

forEach(gcodes, (groupName, group) => {
  forEach(groupName, (command, gcode) => {
    G_CODES[gcode] = {
      COMMAND: command,
      GROUP: group
    }
  })
})

const mcodes = require('./mcodes.json')

forEach(mcodes, (command, mcode) => {
  M_CODES[mcode] = {
    COMMAND: command,
    GROUP: 'MACHINE'
  }
})
