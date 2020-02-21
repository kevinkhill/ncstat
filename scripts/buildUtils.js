/* eslint-disable no-sync */

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const stringLength = require("string-length");

const logger = require("./logger");

const MONO_ROOT = path.resolve(__dirname, "..");

const PACKAGES_DIR = path.join(MONO_ROOT, "packages");

const OK = logger.OK;

/**+
 * Get absolute paths of all directories under "<roorDir>/packages/*"
 */
module.exports.getPackages = function getPackages() {
  return fs
    .readdirSync(PACKAGES_DIR)
    .map(file => path.resolve(PACKAGES_DIR, file))
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory());
};

module.exports.adjustToTerminalWidth = function adjustToTerminalWidth(
  str
) {
  const columns = process.stdout.columns || 80;
  const WIDTH = columns - stringLength(logger.OK) + 1;
  const strs = str.match(new RegExp(`(.{1,${WIDTH}})`, "g"));

  let lastString = strs[strs.length - 1];

  if (lastString.length < WIDTH) {
    lastString += Array(WIDTH - lastString.length).join(chalk.dim("."));
  }

  return strs
    .slice(0, -1)
    .concat(lastString)
    .join("\n");
};

module.exports.OK = OK;
module.exports.MONO_ROOT = MONO_ROOT;
module.exports.PACKAGES_DIR = PACKAGES_DIR;
