const { resolve } = require
const { forEach } = require('lodash')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

const CODES = {
  G: {},
  M: {},
}

function readYaml(filepath) {
  return safeLoad(readFileSync(resolve(filepath)))
}

forEach(readYaml('./definitions/gcodes.yml'), (codeGroup, category) => {
  forEach(codeGroup, (command, code) => {
    CODES.G[code] = {
      CMD: command,
      CAT: category,
    }
  })
})

forEach(readYaml('./definitions/mcodes.yml'), (command, code) => {
  CODES.M[code] = {
    CMD: command,
    CAT: 'MACHINE',
  }
})

module.exports = CODES
