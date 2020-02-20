/* eslint-disable no-sync */
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const execa = require("execa");
const { getPackages } = require("./buildUtils");
const { logger } = require("./logger");

const packagesWithTs = getPackages().filter(p =>
  fs.existsSync(path.resolve(p, "tsconfig.json"))
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const yarn = args => execa.sync("yarn", args, { stdio: "inherit" });

logger.heading("Building TypeScript definition files");

try {
  yarn(["tsc", "-b", ...packagesWithTs, ...process.argv.slice(2)]);

  logger.success("Successfully built TypeScript definition files");
} catch (e) {
  logger.error("Failed to build TypeScript definition files");

  console.error(e.stack);

  process.exitCode = 1;
}
