const { resolve } = require('path')
const { safeLoad } = require('js-yaml')
const { readFileSync } = require('fs')

module.exports.yaml2json = function (filepath) {
    // const path = resolve(...filepath)

    return safeLoad(readFileSync(filepath))
}