const { resolve } = require('path');
const { intersection } = require('lodash')
const { readdir, stat } = require('fs').promises;

async function* getFiles(dir) {
  const subdirs = await readdir(dir);
  for (const subdir of subdirs) {
    const res = resolve(dir, subdir);
    if ((await stat(res)).isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function forEachNcFileInWhitelist (callback, whitelist) {
  for await (const f of getFiles('/mnt/c/H+405 PROGRAM VAULT')) {
    if (/NC$/.test(f) && intersection(whitelist, f.split('/')).length > 0) {
      callback(f)
    }
  }
}

module.exports = {
  forEachNcFileInWhitelist
}